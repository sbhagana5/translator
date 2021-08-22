
const {Translate} = require("@google-cloud/translate").v2;
require("dotenv").config();

const CREDENTIALS =JSON.parse(process.env.CREDENTIALS);

const translate =new  Translate({
    credentials:CREDENTIALS,
    projectId:CREDENTIALS.project_id
});

// to detect the language .
const detect =async(text)=>{
try{
let res = await translate.detect(text)
console.log("res[0]",res[0].language);
return res[0].language;
}catch(error){
console.log(error);
}
}
// to translate the language.
const translation =async(text,target)=>{
    try {
   
    const response =await translate.translate(text,target)
    // console.log(response[1].data.translations[0]);   
    return response[1].data.translations[0]
    } catch (error) {
        console.log(error.message);
    }
}
  module.exports ={
      detect,translation
  }