import express from 'express'
import UserModel from '../models/user'

export class UserController{
    login = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;

        UserModel.findOne({'username': username, 'password': password}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })
    }

    register = (req: express.Request, res: express.Response)=>{
        UserModel.find({}, (err, users)=>{
            if(err) console.log(err)
            else {
                let id = users[users.length-1].id + 1

                let user = new UserModel({
                    id: id,
                    username: req.body.username,
                    password: req.body.password,
                    fullName: req.body.fullName,
                    address: req.body.address,
                    email: req.body.email,
                    telephone: req.body.telephone,
                    image: req.body.image,
                    status: req.body.status,
                    type: req.body.type
                })
                
                user.save((err, resp)=>{
                    if(err) {
                        console.log(err);
                        res.status(400).json({"message": "notok"})
                    }
                    else res.json({"message": "ok"})
                })
            }
        });    
    }
    usernameExists = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        UserModel.findOne({'username': username}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })

    }

    emailExists = (req: express.Request, res: express.Response)=>{
        let email = req.body.email;
        UserModel.findOne({'email': email}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })
    }
    changePassword = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let newpassword = req.body.newpassword;
        UserModel.updateOne({'username': username},{$set:{'password': newpassword}}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })
    }

    adminLogin= (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;
        
        UserModel.findOne({'username': username, 'password': password, 'type': 'admin'}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })
    }

    getAllUsers= (req: express.Request, res: express.Response)=>{
              
        UserModel.find({}, (err, users)=>{
            if(err) console.log(err);
            else res.json(users)
        })
    }

    acceptUser = (req: express.Request, res: express.Response)=>{
        let username = req.body.username
       
        
         UserModel.updateOne({'username': username}, {$set: {'status':'Prihvacen'}}, (err, resp)=>{
            if(err){
                console.log(err);
                res.status(400).json({"message": "notok"})
            }
             else res.json({"message": "ok"})
         });
     }

     deleteUser = (req: express.Request, res: express.Response)=>{
        let username = req.body.username
       
        
         UserModel.deleteOne({'username': username}, (err, resp)=>{
            if(err){
                console.log(err);
                res.status(400).json({"message": "notok"})
            }
             else res.json({"message": "ok"})
         });
     }
     changeUser = (req: express.Request, res: express.Response)=>{
        let id = req.body.id;
        let username = req.body.username
        let password = req.body.password
        let fullName = req.body.fullName
        let address = req.body.address
        let email = req.body.email
        let telephone = req.body.telephone
        let image = req.body.image
        let status = req.body.status
        let type = req.body.type
       
        
        UserModel.updateOne({'id': id}, {$set: {'username':username, 'password':password, 'fullName':fullName, 'address':address, 'email': email, 'telephone': telephone, 'image': image, 'status': status, 'type':type}}, (err, resp)=>{
            if(err){
                console.log(err);
                res.status(400).json({"message": "notok"})
            }
             else res.json({"message": "ok"})
         });
    }
    rejectUser = (req: express.Request, res: express.Response)=>{
        let username = req.body.username
       
        
         UserModel.updateOne({'username': username}, {$set: {'status':'Odbijen'}}, (err, resp)=>{
            if(err){
                console.log(err);
                res.status(400).json({"message": "notok"})
            }
             else res.json({"message": "ok"})
         });
     }

     upgradeUser= (req: express.Request, res: express.Response)=>{
        let username = req.body.username
       
        
         UserModel.updateOne({'username': username}, {$set: {'type':'moderator'}}, (err, resp)=>{
            if(err){
                console.log(err);
                res.status(400).json({"message": "notok"})
            }
             else res.json({"message": "ok"})
         });
     }

     downGradeUser= (req: express.Request, res: express.Response)=>{
        let username = req.body.username
       
        
         UserModel.updateOne({'username': username}, {$set: {'type':'citalac'}}, (err, resp)=>{
            if(err){
                console.log(err);
                res.status(400).json({"message": "notok"})
            }
             else res.json({"message": "ok"})
         });
     }

     blockUser= (req: express.Request, res: express.Response)=>{
        let username = req.body.username
       
        
         UserModel.updateOne({'username': username}, {$set: {'status':'Blokiran'}}, (err, resp)=>{
            if(err){
                console.log(err);
                res.status(400).json({"message": "notok"})
            }
             else res.json({"message": "ok"})
         });
     }

     unblockUser= (req: express.Request, res: express.Response)=>{
        let username = req.body.username
        
         UserModel.updateOne({'username': username}, {$set: {'status':'Prihvacen'}}, (err, resp)=>{
            if(err){
                console.log(err);
                res.status(400).json({"message": "notok"})
            }
             else res.json({"message": "ok"})
         });
     }

  
     
}