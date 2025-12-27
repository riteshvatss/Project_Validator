import jwt from "jsonwebtoken";
import 'dotenv/config'

export function developerAuthMiddleware(req,res,next){
    

    try{
       

        const auth = req.headers.authorization??"";

       
        
        const success=jwt.verify(auth,process.env.developerSecretKey);
        

        if(success.id){
            req.userid=success.id;
            next();
        }
   
}

catch(e){
    res.status(402).send(e);
}

}

export function validatorAuthMiddleware(req,res,next){

    try{

    const token=req.headers.authorization??"";
   

    const verify =jwt.verify(token,process.env.validatorSecretKey);
        
    
    if(verify.id){
        req.id=verify.id;
        return next();
    }
    else{
        res.json({msg:"you are not logged in "});
    }
   
}

catch(e){
    res.status(402).send(e);
}

}



