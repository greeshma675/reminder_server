const db=require('./db')
const jwt=require('jsonwebtoken')
const register=(user_name,user_id,user_password)=>{
    return db.user.findOne({
        user_id
    }).then(user=>{
        if(user){
            return{
                status:false,
                message:"Already registered..!!Please login.",
                statusCode:401
            }
        }else{
            const newUser=new db.user({
                user_id,
                user_name,
                user_password
            })
            newUser.save()
            return{
                status:true,
                message:"Successfully registered",
                statusCode:200
            }
        }
    })
        
   
}
const login=(user_id,user_password)=>{
    return db.user.findOne({
        user_id,user_password
    }).then(user=>{
        if(user){
            currentUser=user.user_name
            currentUserid=user_id
            token=jwt.sign({
                //store account no inside token
                currentUserid:user_id
              },"secretkey12345")
            return{
                status:true,
                message:"Login successfully",
                statusCode:200,
                currentUser,
                currentUserid,
                token
            }
        }else{

            return{
                status:false,
                message:"Invalid username or password",
                statusCode:402
            }
        }
    })
}

 const addevent=(user_id,rem_date,rem_desc)=>{
        random_id=Math.floor(1000 + Math.random() * 9000);
        return db.user.findOne({
            user_id
        }).then(user=>{
            if(user){
                user.event.push({
                    event_id:random_id,
                    event_date:rem_date,
                    event_desc:rem_desc
                })
                user.save()
                return{
                    status:true,
                    message:"Event added",
                    statusCode:200
                }
            }else{
                return{
                    status:false,
                    message:"Error occured",
                    statusCode:402
                }
            }
        })
    }


const getevents=(user_id)=>{
    return db.user.findOne({
        user_id
    }).then(user=>{
        if(user){
            return{
                status:true,
                statusCode:200,
                event:user.event
            }
        }else{
            return{
                status:false,
                message:"Error occured",
                statusCode:402
            } 
        }
    })
}
const deleteEvent=(user_id,index)=>{
    return db.user.findOne({
        user_id
    }).then(user=>{
        if(user){
            user.event.splice(index,1)
            user.save()
            return{
                status:true,
                message:"Event deleted",
                statusCode:200
            }
        }
        else{
            return{
                status:false,
                message:"Error occured",
                statusCode:402
            } 
        }
    }) 
}
const deleteAccount=(user_id)=>{
    return db.user.deleteOne({user_id})
    .then(user=>{
        if(user){
            return{
              status:true,
              statusCode:200,
              message:"User deleted"
            } 
          }else{
            return {
              status:false,
              message:"User not existing",
              statusCode:401
            }
          }
    })
}
const updateEvent=(user_id,index,event_id,rem_date,rem_desc)=>{
    const data={
        event_id:event_id,
        event_date:rem_date,
        event_desc:rem_desc
    }
    return db.user.findOne({user_id,event_id})
    .then(user=>{
        if(user){
            user.event.splice(index,1,data)
            user.save()
            return{
                status:true,
                statusCode:200,
                message:"Event updated"
              } 
        }else{
            return{
                status:true,
                statusCode:400,
                message:"Error occured"
              } 
        }
    })
}
// const chooseDate=(user_id,event_date)=>{
//     return db.user.findOne({user_id})
//     .then(user=>{
//         if(user){
            
//             return{
//                 status:true,
//                 statusCode:200,
//                 event:user.event
//             }
//         }else{
//             return{
//                 status:false,
//                 message:"Error occured",
//                 statusCode:402
//             } 
//         }        
//     })
// }
module.exports={
    register,
    login,
    addevent,
    getevents,
    deleteEvent,
    deleteAccount,
    updateEvent
}

// user.event.pop({
            //     event_id:event_id,
            //     event_date:rem_date,
            //     event_desc:rem_desc
            // })
            // user.event.push({
            //     event_id:event_id,
            //     event_date:rem_date,
            //     event_desc:rem_desc
            // }
            // )