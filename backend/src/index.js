import express, { json } from "express";
import 'dotenv/config'
import cors from "cors"
import { PrismaClient,Prisma } from "@prisma/client";
import validatorRoute from "./routes/validator.js";
import developerRoute from "./routes/developer.js";
import jwt from 'jsonwebtoken';
import { developerAuthMiddleware } from "./authMiddleware.js";
import nacl from "tweetnacl";
import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import bs58 from "bs58";

const prisma=new PrismaClient()
const app=express();
const port=3000;
app.use(json());
app.use(cors());

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

app.use("/app/v1/validator",validatorRoute);
app.use("/app/v1/developer",developerRoute);

app.get("/getStatus",(req,res)=>{
 
    return res.status(200).json({msg:"ALl ookk"})
})


app.post("/SignIn",async(req,res)=>{

  try{
    const {signature,publicKey}=req.body;
    const signature_bs58=bs58.decode(signature);
    const message = new TextEncoder().encode("SIgn in from Project11111");

    const verify_Sign=nacl.sign.detached.verify(message, 
                       signature_bs58,
                        new PublicKey(publicKey).toBytes())
    
                        

    if(verify_Sign){
    const existingUser=await prisma.developer.findFirst({
            where:{
                address:publicKey,
            }
        })
       
        if(existingUser){
            const token = jwt.sign({id:existingUser.id},process.env.developerSecretKey);
           return res.status(200).json({token:token,id:existingUser.id});
    
        }else{
    
            const createUser=await prisma.developer.create({
                data:{
                address:publicKey,
                }
            })
            const createdev=await prisma.validator.create({
              data:{
                address:publicKey,
              }
            })
            const token = jwt.sign({id:createUser.id},process.env.developerSecretKey);
           return res.status(200).json({token:token, id:createdev.id});    
        }
      }else{
       return  res.status(400).json({err:"Invalid Signature"});
      }
    }
    catch(error){
      return res.status(500).json({err:error.message});
    }
})

app.listen(port,()=>{
  console.log("running on port ${port}")
})