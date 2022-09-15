import express from 'express'
import RentalModel from '../models/rental'

export class RentalController{
    getAllRentals = (req: express.Request, res: express.Response)=>{
        
        RentalModel.find({}, (err, rentals)=>{
            if(err) console.log(err);
            else res.json(rentals)
        })
    }

    getAllRentalsFromUser = (req: express.Request, res: express.Response)=>{
        let username= req.body.username;
        RentalModel.find({'username': username}, (err, rentals)=>{
            if(err) console.log(err);
            else res.json(rentals)
        })
    }

    returnTheBook=(req: express.Request, res: express.Response)=>{
        let idB = req.body.idB;
        let id = req.body.id;
        let returnDate = req.body.returnDate;

        RentalModel.updateOne({'id':id, 'idB': idB}, {$set: {'returnDate': returnDate, 'active' : false}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({"message":'ok'})
        });
    }

    userHasBook = (req: express.Request, res: express.Response)=>{
        let idB = req.body.idB;      
        let username = req.body.username;
        
        RentalModel.find({'idB': idB, 'username': username, 'active' : true}, (err, rentals)=>{
            if(err) console.log(err)
            else {
                if(rentals.length>0) res.json({"message":'ima'})
                else res.json({"message":'nema'})
            }
        });
    }
    

    rentABook = (req: express.Request, res: express.Response)=>{
        let idB = req.body.idB;      
        let username = req.body.username;
        let daysRent = req.body.daysRent;

        let stDate = new Date()
        let startDate =  stDate.getFullYear()+ "-"  
             + ('0' + (stDate.getMonth()+1)).slice(-2) + '-'
             + ('0' + stDate.getDate()).slice(-2);

        let date = new Date()
        date.setDate(date.getDate() + daysRent)
        let endDate =  date.getFullYear()+ "-"  
             + ('0' + (date.getMonth()+1)).slice(-2) + '-'
             + ('0' + date.getDate()).slice(-2);
             
             RentalModel.find({}, (err, rentals)=>{
                if(err) console.log(err)
                else {
                    let id = rentals[rentals.length-1].id + 1

                    let rental = new RentalModel({
                        id : id,
                        idB : idB,
                        username: username,
                        startDate : startDate,
                        endDate: endDate,
                        active: true,
                        returnDate: null,
                        hasExtended: false
                    })
                    
                    rental.save((err, resp)=>{
                        if(err) {
                            console.log(err);
                            res.status(400).json({"message": "error"})
                        }
                        else res.json({"message": "ok"})
                    })
                }
            });

    }

    hasUserRentedTheBook = (req: express.Request, res: express.Response)=>{
        let username= req.body.username;
        let idB = req.body.idB
        RentalModel.find({'username': username, 'idB': idB}, (err, rentals)=>{
            if(err) console.log(err);
            else {
                if(rentals.length>0) res.json({"message":'jeste'})
                else res.json({"message":'nije'})
            }
        })
    }
    isBookRented = (req: express.Request, res: express.Response)=>{       
        let idB = req.body.idB
        RentalModel.find({'active': true, 'idB': idB}, (err, rentals)=>{
            if(err) console.log(err);
            else {
                if(rentals.length>0) res.json({"message":'jeste'})
                else res.json({"message":'nije'})
            }
        })
    }
    userHasBookRented = (req: express.Request, res: express.Response)=>{       
        let username = req.body.username
        RentalModel.find({'active': true, 'username': username}, (err, rentals)=>{
            if(err) console.log(err);
            else {
                if(rentals.length>0) res.json({"message":'jeste'})
                else res.json({"message":'nije'})
            }
        })
    }
    extendTheBook = (req: express.Request, res: express.Response)=>{       
        let id = req.body.id
        let days = req.body.days
        RentalModel.findOne({'id': id}, (err, rental)=>{
            if(err) console.log(err);
            else {
                if(rental) {
                    let currentDate = rental.endDate
                    let date = new Date(currentDate)
                    date.setDate(date.getDate()+days)
                    let endDate =  date.getFullYear()+ "-"  
                    + ('0' + (date.getMonth()+1)).slice(-2) + '-'
                    + ('0' + date.getDate()).slice(-2);

                    RentalModel.updateOne({'id': id}, {$set: {'endDate': endDate, 'hasExtended':true}}, (err, resp)=>{
                        if(err) console.log(err)
                        else res.json({"message":'ok'})
                    });
                }
                else{
                    res.json({"message":'notok'})
                }
            }
        })
        
    }

    deleteAllRentalsFromUser = (req: express.Request, res: express.Response)=>{
        let username = req.body.username
       
        
         RentalModel.deleteMany({'username': username}, (err, resp)=>{
            if(err){
                console.log(err);
                res.status(400).json({"message": "notok"})
            }
             else res.json({"message": "ok"})
         });
    }

    deleteAllRentalsForBook= (req: express.Request, res: express.Response)=>{
        let idB = req.body.idB
       
        
         RentalModel.deleteMany({'idB': idB}, (err, resp)=>{
            if(err){
                console.log(err);
                res.status(400).json({"message": "notok"})
            }
             else res.json({"message": "ok"})
         });
    }
}