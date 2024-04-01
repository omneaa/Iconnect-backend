

const sendNotification=async (webHookURL,data)=>{
    try{
const response=await axios.post(webHookURL,data);
console.log('Notification sent:', response.status);
    }
    catch(e){
console.error("error :",e);
    }
}
module.exports={
    sendNotification
}