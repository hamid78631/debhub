const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title : { type : String ,required : true },
    author : {type : String , required : true} ,
    content : {type : String }, 
    likes : [{ type : mongoose.Schema.Types.ObjectId , ref : 'User'}], 
    tags : [{type : String}]
}  , {timestamps : true })


module.exports = mongoose.model("Post" , postSchema)