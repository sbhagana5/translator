const { urlencoded } = require("body-parser");
const express = require("express");
const { serachText } = require("./src/database/mongoose");
const app = express()
const port = 9000    || process.env.PORT
app.use(express.urlencoded({extended:true}))
app.set("view engine","ejs");
const {translateInAllLanguage,targetAndSourceName}= require("./src/middleware/middleware")
app.use("/static",express.static("./static"));
const {translation}= require("./src/translator");


// Routers
app.get("/",(req,res)=>{
    res.render("index.ejs",{
        translatedText:'',
        sourceLang:'default',
        TargetLang:'select Language',
        textarea1:'',

    })
})
app.post("/",async(req,res)=>{
    let translatedLang;
    const LanguageName =await targetAndSourceName(req.body.TargetLang,req.body.textarea1) //to get the target and source language
    
    // check whether text is previouly stored in database or not.
    const resultOfSearchText = await serachText(req.body.textarea1,)
if (resultOfSearchText) {
    resultOfSearchText.translated.forEach(element => {
        
            if(req.body.TargetLang==element.target){
                translatedLang =element.translatedText
            }
    });
} else {
    // translating the text.
     const result = await translation(req.body.textarea1,req.body.TargetLang)
    translatedLang = result.translatedText
    // calling function to store in the database in all languages.
    const elements=translateInAllLanguage(req.body.textarea1,req.body.TargetLang,req.body.sourceLang);
}    
    res.render("index",{
      translatedText:translatedLang,
        sourceLang:LanguageName.sourceLangName,
        TargetLang:LanguageName.TargetLangName,
        textarea1:req.body.textarea1
})

  
})





// port s
app.listen(port,()=>{   
    console.log("port is on 9000");
})