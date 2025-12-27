import { Router } from "express";
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken';
import { Connection, Keypair, PublicKey, SystemProgram, Transaction, sendAndConfirmTransaction } from "@solana/web3.js";

const validatorRoute=Router();
const prisma = new PrismaClient();
import { validatorAuthMiddleware } from "../authMiddleware.js";
const total_Submission=50;
const connection=new Connection(process.env.RPC);
import bs58 from 'bs58';
import { createValidatorSubmission } from "../InputZod.js";

validatorRoute.get("/dashboard",validatorAuthMiddleware,async(req,res)=>{

    try{
        const val_id=req.id;
        const val_submissions=await prisma.submission.findMany({
            where: {
                    validator_Id:val_id
            }
        })

        const validator_Data=await prisma.validator.findFirst({
            where:{
                id:val_id
            }
        });

        const stats=val_submissions.reduce((acc,submission)=>{
            acc.Average_score+=submission.rating;
            acc.Total_projects+=1;
            acc.Projects_Above3+=submission.rating>3?1:0;
            return acc;
        },{
            Average_score:0,
            Total_projects:0,
            Projects_Above3:0,
            sol_Withdrawable:validator_Data.sol_Withdrawable,
            sol_Withdrawn:validator_Data.sol_Withdrawn,
            sol_Earned:validator_Data.sol_Withdrawable+validator_Data.sol_Withdrawn
        });

        

        stats.Average_score=stats.Total_projects>0?(stats.Average_score/stats.Total_projects):stats.Average_score;

        return res.json(stats);
    }
    catch(error){
        return res.status(500).json({err:error.message});
    }    



})

validatorRoute.get("/BulktasksValidated",validatorAuthMiddleware,async(req,res)=>{
    try{
        const validator_Id=req.id;
            const tasks=await prisma.task.findMany({
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


                },
                    where:{
                        submissions:{
                            some:{
                                validator_Id:validator_Id
                            }
                        }

                    }
                
            })

            if(tasks.length===0){
                    return res.status(400).json({msg:"No Tasks submiited "});
            }


            return res.status(200).json(tasks);
        }
        catch(error){
            return res.status(500).json({err:error.message});
        }        

})

validatorRoute.post("/ValidationSubmission",validatorAuthMiddleware,async(req,res)=>{
    try{
        const validator_Id=req.id;
        const body=req.body;
        const bodySafeParse=createValidatorSubmission.safeParse(body);
        if(!bodySafeParse.success){
            return res.status(400).json({err:"Invalids inputs"});
        }

        const validation_exist=await prisma.task.findFirst({
            where:{
                id:bodySafeParse.data.task_Id,
                submissions:{
                    some:{
                    validator_Id:validator_Id
                }}
            }
        })

        if(validation_exist){
            return res.status(404).json({err:"User have already submitted this task"});
        }

        
        const submission=await prisma.$transaction(async tx=>{

                    const task_Submission=await tx.submission.create({data:     {                            
                                validator_Id:validator_Id,
                                task_Id:bodySafeParse.data.task_Id,
                                comment:bodySafeParse.data.comment,
                                rating:bodySafeParse.data.rating
                    
                    }});
                    const task=await tx.task.findFirst({where:{
                        id:bodySafeParse.data.task_Id,
                    }})
                    if(task.task_SubmissionCount>=50){
                          return res.status(400).json({err:"This task has reached his submission limit"});
                        }

                    const avg_Rating=task.average_Rating;
                    const task_SubmissionCount=task.task_SubmissionCount;

                    const new_Avg=(task.average_Rating*task_SubmissionCount+bodySafeParse.data.rating)/(task_SubmissionCount+1);

                    await tx.task.update({
                        data:{
                            average_Rating:new_Avg,
                            task_SubmissionCount:{
                                increment:1
                            }
                        },where:{
                            id:bodySafeParse.data.task_Id
                        }
                    })

                

                await tx.validator.update({where:{
                        id:validator_Id
                    },
                    data:{
                        sol_Withdrawable:{
                            increment:parseInt(bodySafeParse.data.task_amount/total_Submission)
                        }
                    }
                    })
                
                    return task_Submission;
        })
        if(!submission){
            return res.status(400).json({err:"Invalid Inputs"});
        }
            return res.status(200).json({success:true})
    }
    catch(error){
        res.status(500).json({success:false,error:error.message})

    }

})



validatorRoute.get("/BulktasksToBeValidate",validatorAuthMiddleware,async(req,res)=>{
  try{
    const validator_Id=req.id;
        const tasks=await prisma.task.findMany({
            select:{
                id:true,
                title:true,
                description:true,
                average_Rating:true,
                 task_SubmissionCount:true,
                web_Url:true,
                github_Url:true,
                image_Url:true,
                amount:true,


            },
            where:{
                NOT:{
                    developer_Id:validator_Id,
                },

                submissions:{
                    none:{
                        validator_Id:validator_Id
                    }
                }
            }
            
        })

        if(tasks.length===0){
            return res.status(400).json({err:"No tasks pending for validation"});
        }


        return res.status(200).json(tasks);
    }
    catch(error){
        return res.status(500).json({err:error.message});
    }    

})

async function sendSol(amount,address){

     const transaction=new Transaction().add(
            SystemProgram.transfer({
                fromPubkey:new PublicKey(process.env.wallet),
                toPubkey:new PublicKey(address),
                lamports:amount,
            })
        );
               

        const keypair=Keypair.fromSecretKey(bs58.decode(process.env.Private_key));
        
        let signature="";

        signature=await sendAndConfirmTransaction(
            connection,
            transaction,
            [keypair]

        )

        if(!signature) throw new Error("on chain transaction has failed");
        return signature;
}

async function payout_Transaction(payoutDb_Id){


    const payout=await prisma.payout.findUnique({
        where:{
            id:payoutDb_Id
        },
        include:{validator:true}
    });


    try{

        const signature=await sendSol(payout.amount,payout.validator.address);

        const payoutDB=await prisma.payout.update({
                data:{
                    status:"Completed",
                    signature:signature
                },
                where:{
                        id:payoutDb_Id
                }
            });

            return payoutDB
        }

    catch(err){
        const payout_Db=await prisma.$transaction(async(tx)=>{
                await tx.validator.update({
                    data:{
                        sol_Withdrawable:{
                            increment:payout.amount
                        },
                        sol_Withdrawn:{
                            decrement:payout.amount
                        }
                    },
                    where:{
                        id:payout.validator_Id
                    }

                });

                const payoutDB=await tx.payout.update({
                    data:{
                        status:"Failed",
                    },
                    where:{
                        id:payout.id
                    }
                })

                return payoutDB
        })
        return payout_Db
    }

}

validatorRoute.get("/payout",validatorAuthMiddleware,async(req,res)=>{
     
    try{
        const validator_Id=req.id;
      
        const payout_Db=await prisma.$transaction(async tx=>{

        const validator=await tx.validator.findUnique({
            where:{
                id:validator_Id
              }
            });
            const amount=validator.sol_Withdrawable;
            //it will check and update the sol present in the validator 
            const result= await tx.validator.updateMany({
                data:{
                    sol_Withdrawn:{
                        increment:amount
                    },
                    sol_Withdrawable:{
                        decrement:amount
                    }
                },
                where:{
                    id:validator_Id,
                    sol_Withdrawable:{
                        gte:amount
                    }
                }
                
            });
            // if the validator have less then 0 sol it wont be update and it will throw error
            if(result.count!==1){
                throw new Error("Insufficient balance");
            }

            return await tx.payout.create({
                data:{
                    validator_Id:validator_Id,
                    amount:amount,
                    status:"pending",
                    signature:""
                }
            });

        });
        console.log(payout_Db);
        const payout_DB1=await payout_Transaction(payout_Db.id);

        if (!payout_DB1) {
    return res.status(500).json({ msg: "Payout processing failed" });
}

if (payout_DB1.status === "Failed") {
    return res.status(400).json({ msg: "Transaction failed" });
}

       
        return res.status(200).json({msg:"payment completed",payment_Details:payout_DB1});

    }
    catch(error){
            return res.status(500).json({msg:error.message});

    }
    });


validatorRoute.get("/task",validatorAuthMiddleware,async(req,res)=>{
    try{
        const validator_Id=req.id;
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
                    submissions:true,


                },
                where:{
                    id:task_Id
                }
            })

            if(!task){
                return res.status(400).json({err:"No task existed"});
            }


            return res.status(200).json(task);
}
catch(error){
    return res.status(500).json({err:error.message});
}

});


export default validatorRoute;