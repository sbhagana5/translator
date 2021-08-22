const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/translator",{
useNewUrlParser:true,
useCreateIndex:true,
useUnifiedTopology:true
})

const translatedText = mongoose.model("TranslatedText",{
text:{
type:String
},
translated:{
    type:Array
}

})

const insertText =(text,translated)=>{
    const insert =new translatedText({
        text,
        translated
    })
    insert.save().then(console.log(insert));
}

const serachText = async(text,TargetLang)=>{
  return await  translatedText.findOne({text},(err,res)=>{
    if (err) {
        console.log(err)
    } else {
        return res
        }
    }
 )
}

module.exports ={ insertText ,serachText};