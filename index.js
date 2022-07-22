const express=require('express')
const app=express()
const cors=require('cors')
const dataService=require('./service/data.server')
const jsonwebtoken=require('jsonwebtoken')
app.use(express.json())
app.use(cors({
    origin:'http://localhost:4200'
}))
app.listen(3001,()=>{
    console.log("server started");
})
const jwtMiddleware=(req,res,next)=>{
    try{
        //fetch token
        // token=req.body.token //while token in body
        token=req.headers['token']
        // verify token
        const data=jsonwebtoken.verify(token,"secretkey12345")
        console.log(data);
        req.currentUserid=data.currentUserid
        next()
    }
    catch{
        res.status(401).json({
            status:false,
            statusCode:401,
            message:"Please login"
        })
    }
}
app.post('/register',(req,res)=>{
    dataService.register(req.body.user_name,req.body.user_id,req.body.user_password).
    then(result=>{
        res.status(result.statusCode).json(result)
    })
})
app.post('/login',(req,res)=>{
    dataService.login(req.body.user_id,req.body.user_password).
    then(result=>{
        res.status(result.statusCode).json(result)
    })
})
app.post('/addevent',(req,res)=>{
    dataService.addevent(req.body.user_id,req.body.rem_date,req.body.rem_desc).then(result=>{
        res.status(res.statusCode).json(result)
    })
})
app.post('/events',(req,res)=>{
    dataService.getevents(req.body.user_id).then(result=>{
        res.status(result.statusCode).json(result)
    })
})
app.post('/deleteEvent',(req,res)=>{
    dataService.deleteEvent(req.body.user_id,req.body.index).then(result=>{
        res.status(result.statusCode).json(result)
    })
})
app.delete('/deleteAccount/:user_id',jwtMiddleware,(req,res)=>{
    dataService.deleteAccount(req.params.user_id).then(result=>{
        res.status(result.statusCode).json(result)
    })
})
app.post('/updateEvent',(req,res)=>{

    dataService.updateEvent(req.body.user_id,req.body.index,req.body.event_id,req.body.rem_date,req.body.rem_desc).then(result=>{
        res.status(result.statusCode).json(result)
    })
})
// app.get('/chooseDate/:event_date',jwtMiddleware,(req,res)=>{
//     dataService.chooseDate(req.params.user_id,req.body.event_date).then(result=>{
//         res.status(result.statusCode).json(result)
//     })
// })

