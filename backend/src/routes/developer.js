import { Router } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import {developerAuthMiddleware} from "../authMiddleware.js";
import { createTaskInput } from "../InputZod.js";
import { createPresignedPost } from '@aws-sdk/s3-presigned-post'
import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import jwt from 'jsonwebtoken';
import {Connection, PublicKey,Transaction } from     "@solana/web3.js";
import bs58 from 'bs58'


const developerRoute=Router();
const prisma=new PrismaClient();

const connection =new Connection(process.env.RPC,"processed");

await prisma.$transaction(
  async (tx) => {
    // Code running in a transaction...
  },
  {
    maxWait: 5000, // default: 2000
    timeout: 10000, // default: 5000
    isolationLevel: Prisma.TransactionIsolationLevel.Serializable, // optional, default defined by database configuration
  }
)
//<--------------s3 credentials------------>
const s3Client = new S3Client({
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID ?? "",
        secretAccessKey: process.env.ACCESS_SECRET ?? "",
    },
    region: "eu-north-1"
})


//<--------------get Task (individual task)---------------------------->
developerRoute.get("/dashboard",developerAuthMiddleware,async(req,res)=>{

    try{
        const dev_id=req.userid;
        const dev_tasks=await prisma.task.findMany({
            where: {
                    developer_Id:dev_id
            }
        })

        const stats=dev_tasks.reduce((acc,task)=>{
            acc.Average_score+=task.average_Rating;
            acc.Total_projects+=1;
            acc.Projects_Above3+=task.average_Rating>3?1:0;
            acc.Sol_spent+=task.amount;
            return acc;
        },{
            Average_score:0,
            Total_projects:0,
            Projects_Above3:0,
            Sol_spent:0
        });

        stats.Average_score=stats.Total_projects>0?(stats.Average_score/stats.Total_projects):stats.Average_score;

        return res.status(200).json(stats);
   }
    catch(error){

        return res.status(500).json({msg:error.message});

    }




})

developerRoute.get("/task",developerAuthMiddleware,async(req,res)=>{

   try{
    const developer_Id=req.userid;
    const task_Id=Number(req.query.task_Id);
    const task=await prisma.task.findFirst({
        select:{
            id:true,
            title:true,
            description:true,
            average_Rating:true,
            web_Url:true,
             task_SubmissionCount:true,
            github_Url:true,
            image_Url:true,
            amount:true,
            submissions:true 


        },
        where:{
            id:task_Id
        }
    });

    if(!task){
        return res.status(404).json({msg:"No task exits"});
    }


    return res.status(200).json(task);

   }
   catch(error){
        return res.status(500).json({err:error.message});
   }

})

developerRoute.get("/devloperTasks",developerAuthMiddleware,async(req,res)=>{
    const developer_Id=req.userid;


    try{
        const projectsResponse=await prisma.task.findMany({
            where:{
                developer_Id:developer_Id
            }
        })

        if(projectsResponse){
            return res.json(projectsResponse);
        }else{
            return res.status(404).json({msg:"User havent submitted any task yet"});
        }
    }
    catch(error){
        return res.status(500).json({err:error.message})
    }

})


developerRoute.post("/task",developerAuthMiddleware,async(req,res)=>{
    try{
        const body=req.body;
      
       const developer_Id=req.userid;
      
        const bodySafeParse=createTaskInput.safeParse(body);
      
       
        if(!bodySafeParse.success){
            return res.status(400).json({err:"Invalid inputs"});
        }   
        let config = {
        commitment: "finalized",
        maxSupportedTransactionVersion: 0,
        };
                

        const signature_used=await prisma.task.findFirst({where:{
            signature:bodySafeParse.data.signature
        }})
         
        if(signature_used){
            return res.status(400).json({err:"Using old transaction"});
        }

        const developer=await prisma.developer.findFirst({
            select:{
                address:true,
            },
                where:{
                    id:developer_Id
                
            }
        });
        const transaction= await connection.getTransaction(bodySafeParse.data.signature,config);
          

        if (!transaction || !transaction.meta || transaction.meta.err !== null) {
  return res.status(400).json({ err: "Please wait for 2 sec and click on submit button again" });
}



        const AccountKeys=transaction.transaction.message.getAccountKeys();
       
        
        const accountKeys = AccountKeys.staticAccountKeys;
        const sender_Index = accountKeys.findIndex(k => k.toBase58() === developer.address);
        
        
        if(sender_Index==-1){
            return res.status(403).json({err:"Transation not sent by the correct wallet"})
        }
        

        const reciever_Index=accountKeys.findIndex(k=>k.toBase58()===process.env.wallet);
        
        if(reciever_Index===-1){
            return res.status(403).json({err:"Transaction sent to the wrong adress"})
        }
      

        const preBalance=transaction.meta.preBalances;
        const postBalance=transaction.meta.postBalances;
        const gasFee=transaction.meta.fee;
          

        if(preBalance[sender_Index]-postBalance[sender_Index]<100_000_000){
            return res.status(400).json({err:"Sender has sent less amount "});
        }
         
        if(postBalance[reciever_Index]-preBalance[reciever_Index]<100_000_000){
        return  res.status(400).json({err: "Recieved less amount "});
        }


        const taskDetails=await prisma.$transaction(async (tx)=>{

        await tx.developer.update({
            data:{
                Total_spent:{
                    increment:bodySafeParse.data.amount
                }
            },where:{
                id:developer_Id
            }
        })    

        const taskDetails=await tx.task.create({
            data:{
                title:bodySafeParse.data.title,
                developer_Id:developer_Id,
                description:bodySafeParse.data.description,
                signature:bodySafeParse.data.signature,
                amount:bodySafeParse.data.amount,
                average_Rating:0,
                web_Url:bodySafeParse.data.web_Url,
                github_Url:bodySafeParse.data.github_Url,
                done :false,
                image_Url:bodySafeParse.data.image_Url,
                PaymentSuccess:true,

            }
        })

        return taskDetails;
    
    });
       return res.status(200).json(taskDetails);
    }
    catch(error){

        
        return res.status(500).json({err:error.message});
    }
})





//<---------------------------getPresigned Url------------------------------->
developerRoute.get("/presignedUrl",developerAuthMiddleware,async (req, res) => {
  
        const developer_Id=req.userid;

    const { url, fields } = await createPresignedPost(s3Client, {
        Bucket: 'project-validatorrrrrr',
        Key: `projectImage/${developer_Id}/${Math.random()}/image.jpg`,
        Conditions: [
          ['content-length-range', 0, 5 * 1024 * 1024] // 5 MB max
        ],
        Expires: 3600
    })


    res.json({
        preSignedUrl: url,
       fields: fields,
        
    })
    
})


export default developerRoute;