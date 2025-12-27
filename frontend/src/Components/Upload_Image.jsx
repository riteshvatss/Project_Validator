const Sign_Url=import.meta.env.VITE_URL;
import axios from "axios";

export async function upload_Image(Image_File){
    //we are doing await also in bracket if we dont do this then .data will be undefined as axios will return a promise and in that data is not there and await undefined will undefined...so put await also in bracket.
    const {preSignedUrl,fields}=(await axios.get(`${Sign_Url}/app/v1/developer/presignedUrl`,{
        headers:{
            authorization:localStorage.getItem("token")
        }
    })).data;

    const form_Data=new FormData();
    const cloudFront_Url=import.meta.env.VITE_CLOUDFRONT_URL;
  
    form_Data.set("bucket",fields["bucket"]);
 
    form_Data.set("X-Amz-Credential",fields["X-Amz-Credential"]);

    form_Data.set("X-Amz-Date",fields["X-Amz-Date"]);
    form_Data.set("key",fields["key"]);
    form_Data.set("Policy",fields["Policy"]);
    form_Data.set("X-Amz-Signature",fields["X-Amz-Signature"]);
    form_Data.set("X-Amz-Algorithm",fields["X-Amz-Algorithm"]);
    form_Data.append("file", Image_File[0]);

    await axios.post(preSignedUrl,form_Data);

    const img_Url=`${cloudFront_Url}/${fields["key"]}`;
 
    return img_Url;
}

