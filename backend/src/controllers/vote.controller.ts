import express from 'express'
import VoteModel from '../models/vote'

export class VoteController{
    getAllVotes = (req: express.Request, res: express.Response)=>{
        
        VoteModel.find({}, (err, votes)=>{
            if(err) console.log(err);
            else res.json(votes)
        })
    }

    addComment= (req: express.Request, res: express.Response)=>{
        let idB = req.body.idB
        let username = req.body.username
        let rating = req.body.rating
        let text = req.body.text
        let date = req.body.date
        let time = req.body.time

        VoteModel.find({}, (err, votes)=>{
            if(err) console.log(err)
            else {
                let id = votes[votes.length-1].id + 1

                let vote = new VoteModel({
                    id: id,
                    idB : idB,
                    username: username,
                    rating : rating,
                    text: text,
                    date: date,
                    time: time,
                    isUpdated: false
                })
                
                vote.save((err, resp)=>{
                    if(err) {
                        console.log(err);
                        res.status(400).json({"message": "error"})
                    }
                    else res.json({"message": "ok"})
                })
            }
        });

    }

    hasUserCommented = (req: express.Request, res: express.Response)=>{
        let username = req.body.username
        let idB = req.body.idB
        VoteModel.find({'username': username, 'idB': idB}, (err, votes)=>{
            if(err) console.log(err);
            else res.json(votes)
        })
    }

    updateComment= (req: express.Request, res: express.Response)=>{
        let text = req.body.text
        let id = req.body.id
        let rating = req.body.rating
        let date = req.body.date
        let time = req.body.time

        VoteModel.updateOne({'id': id}, {$set: {'isUpdated':true, 'text': text, 'rating': rating, 'date': date, 'time':time}}, (err, resp)=>{
            if(err){
                console.log(err);
                res.status(400).json({"message": "notok"})
            }
             else res.json({"message": "ok"})
         });
    }

    deleteAllVotesFromUser = (req: express.Request, res: express.Response)=>{
        let username = req.body.username
       
        
         VoteModel.deleteMany({'username': username}, (err, resp)=>{
            if(err){
                console.log(err);
                res.status(400).json({"message": "notok"})
            }
             else res.json({"message": "ok"})
         });
    }

    deleteAllVotesForBook = (req: express.Request, res: express.Response)=>{
        let idB = req.body.idB
       
        
         VoteModel.deleteMany({'idB': idB}, (err, resp)=>{
            if(err){
                console.log(err);
                res.status(400).json({"message": "notok"})
            }
             else res.json({"message": "ok"})
         });
    }

}