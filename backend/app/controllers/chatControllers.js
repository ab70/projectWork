 const ChatSchema = require('../models/Chat')


 function chatControllers(){
    return{
        //add new chat
        async addNewChat(req,res){
            try{
                const {from,to,message} = req.body
                const saveMessage = await ChatSchema.create({
                    message: message,
                    chatusers:[from,to],
                    sender:from
                })
                saveMessage ? res.status(200).json({success:true,message:"Message delivered"})
                :
                res.status(401).json({success:false,message:"Can't deliver message"})
            }
            catch(err){
                res.status(500).json({success:false,message:"Inernal server error"})
            }
        },

        //get messages from db of two user
        async getMessage(req,res){
            try{
                const from = req.params.user1;
                const to = req.params.user2;
                const foundMessages = await ChatSchema.fiind({
                    chatUsers:{
                        $all:[from,to]
                    }
                }).sort({updatedAt:-1})

                const finalMessages = foundMessages.map((msg)=>{
                    return{
                        myself:msg.sender.toString()===from,
                        message: msg.message
                    }
                })
            }
            catch(err){
                
            }
        }
    }
    
 }

 module.exports = chatControllers