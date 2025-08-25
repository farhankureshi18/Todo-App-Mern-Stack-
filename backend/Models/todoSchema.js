let mongoose=require('mongoose')

let todoSchema=mongoose.Schema({
    task:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    isCompleted: {
    type: Boolean,
    default: false
    }
})
module.exports=mongoose.model('Todo',todoSchema);   