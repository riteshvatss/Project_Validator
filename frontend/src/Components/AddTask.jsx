import { useState } from "react";
import { PublicKey, SystemProgram, Transaction,Connection,clusterApiUrl  } from '@solana/web3.js';
import { useWallet} from "@solana/wallet-adapter-react";

import axios from 'axios';
import { upload_Image } from "./Upload_Image";

   
    function AddTask(){
   
        const SignUrl=import.meta.env.VITE_URL;
        const {publicKey,sendTransaction}=useWallet();
        const vite_pubKey=import.meta.env.VITE_PUBKEY;
        const [title,setTitle]=useState("");
        const [description,setDescription]=useState("");
        const [web_Url,setWeb_Url]=useState("");
        const [github_Url,setGithub_Url]=useState("");
       
        const [txsignature,setTxSignature]=useState("");
        const [img_ur,setImg_ur]=useState("");
        const[showImage,setShowImage]=useState();
        
        async function makePayment() {
            if(!publicKey){
                return alert("Please connect the wallet")
            }
            

            const createConnection = () => {
                    return new Connection(clusterApiUrl("devnet"));
                    };

            const connection = createConnection();

            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: new PublicKey(vite_pubKey),
                    lamports: 100000000,
                })
            );

            const {
                context: { slot: minContextSlot },
                value: { blockhash, lastValidBlockHeight }
            } = await connection.getLatestBlockhashAndContext();

            const signature = await sendTransaction(transaction, connection, { minContextSlot });

            await connection.confirmTransaction(
                    {
                        signature,
                        blockhash,
                        lastValidBlockHeight
                    },
                    "confirmed"
                    );
           const img_ur=await upload_Image(showImage);
           setImg_ur(img_ur);
           setTxSignature(signature);
           
        
            return;
    }


        async function sendData() {
            
            await axios.post(`${SignUrl}/app/v1/developer/task`,{
                
                title,
                description,
                web_Url,
                github_Url,
                image_Url:img_ur,
                signature:txsignature,
                amount:Number(100000000)
                
            },{
                    headers:{
                        Authorization:localStorage.getItem("token")
                    }
                }).then((res)=>{console.log(res);
                setDescription("");
                setGithub_Url("");
                setImg_ur("");
                setTitle("");
                setWeb_Url("");
                setTxSignature("");
                alert("Task Submitted");

        }).catch((error)=>{alert(error.response?.data?.err||"Something went wrong")});
        }

    return <div className="px-4 sm:px-10 md:px-24 animate-page-enter">
    <div className="absolute inset-0 -z-10">
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 blur-[120px] animate-orb1" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-600/20 blur-[120px] animate-orb2" />
    </div>
    <h1 className="
      text-center text-4xl sm:text-5xl md:text-6xl
      font-extrabold text-white font-['Poppins']
      bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500
      bg-clip-text text-transparent
      animate-textReveal
    ">
        Add New Project
    </h1>
    <div className="
      mt-12 mx-auto max-w-4xl
      bg-gray-950/80 backdrop-blur-xl
      border border-purple-500/30
      rounded-3xl
      shadow-[0_0_80px_rgba(168,85,247,0.25)]
      p-6 sm:p-10
      animate-section-enter
      
              drop-shadow-[0_0_40px_rgba(168,85,247,0.35)]
    ">
      <div className="flex justify-between mb-8 text-sm text-gray-400">
        <span className={txsignature ? "text-green-400" : "text-purple-400"}>
          1. Upload
        </span>
        <span className={img_ur ? "text-green-400" : ""}>
          2. Pay 0.1 SOl
        </span>
        <span className={txsignature && img_ur ? "text-green-400" : ""}>
          3. Submit
        </span>
      </div>
      <input
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Project Title"
        className="input-web3"
      />

      <input
        onChange={(e) => setShowImage(e.target.files)}
        type="file"
        className="input-web3-file"
      />
      {showImage && (
        <img
          src={URL.createObjectURL(showImage[0])}
          className="mt-4 w-40 h-40 rounded-2xl object-cover animate-fadeIn"
        />
      )}

      <textarea
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
          e.target.style.height = "auto";
          e.target.style.height = `${e.target.scrollHeight}px`;
        }}
        placeholder="Project description"
        className="input-web3 resize-none"
        rows={6}
      />
      <div className="text-right text-sm text-gray-400">
        {description.length}/5000
      </div>
      <input
        onChange={(e) => setWeb_Url(e.target.value)}
        placeholder="Website URL"
        className="input-web3"
      />
      <input
        onChange={(e) => setGithub_Url(e.target.value)}
        placeholder="GitHub URL"
        className="input-web3"
      />
      <div className="
        mt-6 flex justify-center
        text-xl font-bold text-white
        bg-black/50 rounded-xl py-3
        border border-purple-500/30
      ">
        0.1 SOL
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={txsignature && img_ur ? sendData : makePayment}
          className="
            relative overflow-hidden
            px-10 py-4 rounded-xl
            text-lg font-semibold text-white
            bg-gradient-to-r from-emerald-500 to-teal-500
            shadow-[0_0_50px_rgba(16,185,129,0.6)]
            transition-all duration-300
            hover:scale-110 active:scale-95
          "
        >
          {txsignature && img_ur ? "Submit Project" : "Pay 0.1 SOL"}
          <span className="
            absolute inset-0 bg-white/20
            translate-x-[-120%]
            hover:translate-x-[120%]
            transition-transform duration-700
          " />
        </button>
      </div>
    </div>
  </div>
}
    export default AddTask;