const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/reminder',{useNewUrlParser:true})
const user=mongoose.model('user',{
    user_id:String,
    user_name:String,
    user_password:String,
    event:[]
    
})

module.exports={
    user
}