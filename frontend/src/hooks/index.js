import {  useEffect, useState } from "react";
import axios from "axios";
import { SolongWalletAdapter } from "@solana/wallet-adapter-wallets";





export const useTask = (task_Id,pathh) => {
  const SignUrl=import.meta.env.VITE_URL;



  const [task, setTask] = useState([]);
  //added to redploys  
   useEffect(() => {
  if (pathh === "validator") {
    axios.get(`${SignUrl}/app/v1/validator/task`, {
      params: { task_Id },
      headers: { authorization: localStorage.getItem("token") }
    }).then(res => setTask(res.data)).catch((error)=>{alert(error.response?.data?.err||"Something went wrong")});
  }

  if (pathh === "developer") {
    axios.get(`${SignUrl}/app/v1/developer/task`, {
      params: { task_Id },
      headers: { authorization: localStorage.getItem("token") }
    }).then(res => setTask(res.data)).catch((error)=>{alert(error.response?.data?.err||"Something went wrong")});
  }

}, [task_Id, pathh]);



  return { task };
};

export const useDevelopertasks=()=>{
    const [developertasks,Setdevelopertasks]=useState([]);
    const SignUrl=import.meta.env.VITE_URL;
    useEffect(()=>{
      axios.get(`${SignUrl}/app/v1/developer/devloperTasks`,{
        headers:{
          authorization:localStorage.getItem("token")
        }
      }).then((response)=>
      Setdevelopertasks(response.data)
      ).catch((error)=>{alert(error.response?.data?.err||"Something went wrong")});
    },[]);
    return{developertasks};
}

export const useVlaidatortasks=(tobeValidated)=>{
  const SignUrl=import.meta.env.VITE_URL;
  const [validatortasks,Setvalidatortasks]=useState([]);

  useEffect(()=>{
    if(tobeValidated){
     axios.get(`${SignUrl}/app/v1/validator/BulktasksToBeValidate`, {
        headers:{
          authorization:localStorage.getItem("token"),
        },
      }).then((response)=>Setvalidatortasks(response.data)).catch((error)=>{alert(error.response?.data?.err||"Something went wrong")});
    }else{
      axios.get(`${SignUrl}/app/v1/validator/BulktasksValidated`, {
            headers:{
              authorization:localStorage.getItem("token"),
            },
          }).then((response)=>Setvalidatortasks(response.data)).catch((error)=>{alert(error.response?.data?.err||"Something went wrong")});
    }
      },[tobeValidated])
      return{validatortasks};
    }