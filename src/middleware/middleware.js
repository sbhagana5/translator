const {insertText,serachText} = require("../database/mongoose")
const {detect,translation} = require("../translator")
const allLanguage =require('../../languagesWithCode.json')



// function to translate text in all languages
async function translateInAllLanguage(text,){
let arr=[];

for (let index = 0; index < allLanguage.length; index++) {
   const result=await translation(text,allLanguage[index].code);
   if(result!==undefined){
       const element = {
           target:allLanguage[index].code,
           translatedText:result.translatedText,
       }

    await arr.push(element)   
   
}


}
insertText(text,arr);
}


// to list the source and target language name
 
 async function targetAndSourceName(TargetLang,sourceLang){
    const sourceCode=await detect(sourceLang);
console.log(TargetLang)
    let TargetLangName,sourceLangName;
    for (let index = 0; index < allLanguage.length; index++) {
        if(TargetLang===allLanguage[index].code){
            TargetLangName =allLanguage[index].name;
           }else if(sourceCode===allLanguage[index].code){
               sourceLangName = allLanguage[index].name;
           }     
    }
   
return {sourceLangName,TargetLangName}
}
module.exports ={
    translateInAllLanguage,targetAndSourceName
}