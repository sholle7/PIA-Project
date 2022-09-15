import express from 'express'
import BookModel from '../models/book'
import BookRequestModel from '../models/bookRequest'
import BookReservationModel from '../models/bookReservation'

export class BookController{
    getAllBooks = (req: express.Request, res: express.Response)=>{
        
        BookModel.find({}, (err, books)=>{
            if(err) console.log(err);
            else res.json(books)
        })
    }

    updateBook = (req: express.Request, res: express.Response)=>{
       let id = req.body.id
       let amount = req.body.amount
       
        BookModel.updateOne({'id': id}, {$inc: {'amount':amount}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({"message": "ok"})
        });
    }

    addBook= (req: express.Request, res: express.Response)=>{
        let name = req.body.name
        let publisher = req.body.publisher
        let year = req.body.year
        let language = req.body.language
        let coverPicture = req.body.coverPicture        
        let authors = req.body.authors
        let genres = req.body.genres
        let amount = req.body.amount
       
        BookModel.find({}, (err, books)=>{
            if(err) console.log(err)
            else {
                let id = books[books.length-1].id + 1
                
                let book = new BookModel({
                    id : id,
                    name : name,
                    publisher: publisher,
                    year : year,
                    language: language,
                    coverPicture: coverPicture,
                    authors: authors,
                    genres: genres,
                    amount: amount
                })
                
                book.save((err, resp)=>{
                    if(err) {
                        console.log(err);
                        res.status(400).json({"message": "notok"})
                    }
                    else res.json({"message": "ok"})
                })
            }
        });
    }

    changeBookInfo = (req: express.Request, res: express.Response)=>{
        let id = req.body.id
        let name = req.body.name
        let publisher = req.body.publisher
        let year = req.body.year
        let language = req.body.language
        let coverPicture = req.body.coverPicture
        let authors = req.body.authors
        let genres = req.body.genres
        let amount = req.body.amount

        BookModel.updateOne({'id': id}, {$set: {'name': name, 'publisher':publisher, 'year': year, 'language': language, 'coverPicture':coverPicture, 'authors': authors, 'genres': genres, 'amount' : amount}}, (err, resp)=>{
            if(err){
                console.log(err);
                res.status(400).json({"message": "notok"})
            }
            else res.json({'message': 'ok'})
        })
    }

    deleteBook = (req: express.Request, res: express.Response)=>{
         let id = req.body.id
         
         BookModel.deleteOne({'id': id}, (err, resp)=>{
            if(err){
                console.log(err);
                res.status(400).json({"message": "notok"})
            }
             else res.json({"message": "ok"})
         });
    }

    addBookRequest= (req: express.Request, res: express.Response)=>{
        let name = req.body.name
        let publisher = req.body.publisher
        let year = req.body.year
        let language = req.body.language
        let coverPicture = req.body.coverPicture
        let status = req.body.status
        let authors = req.body.authors
        let genres = req.body.genres
        let amount = req.body.amount
        let username = req.body.username

        BookRequestModel.find({}, (err, booksRequests)=>{
            if(err) console.log(err)
            else {
                let id = booksRequests[booksRequests.length-1].id + 1

                let bookRequest = new BookRequestModel({
                    id : id,
                    name : name,
                    publisher: publisher,
                    year : year,
                    language: language,
                    coverPicture: coverPicture,
                    status: status,
                    authors: authors,
                    genres: genres,
                    amount: amount,
                    username: username
                })
                
                bookRequest.save((err, resp)=>{
                    if(err) {
                        console.log(err);
                        res.status(400).json({"message": "notok"})
                    }
                    else res.json({"message": "ok"})
                })
            }
        });
    }

    getAllBooksRequests= (req: express.Request, res: express.Response)=>{
        
        BookRequestModel.find({}, (err, booksRequests)=>{
            if(err) console.log(err);
            else res.json(booksRequests)
        })
    }

    acceptBookRequest = (req: express.Request, res: express.Response)=>{
        let id = req.body.id
       
        
         BookRequestModel.updateOne({'id': id}, {$set: {'status':'Prihvacen'}}, (err, resp)=>{
            if(err){
                console.log(err);
                res.status(400).json({"message": "notok"})
            }
             else res.json({"message": "ok"})
         });
    }

    rejectBookRequest= (req: express.Request, res: express.Response)=>{
        let id = req.body.id      
        BookRequestModel.updateOne({'id': id}, {$set: {'status':'Odbijen'}}, (err, resp)=>{
            if(err){
                console.log(err);
                res.status(400).json({"message": "notok"})
            }
             else res.json({"message": "ok"})
        });
    }

    reserveABook= (req: express.Request, res: express.Response)=>{
        let idB = req.body.idB
        let username = req.body.username  
        
        BookReservationModel.find({}, (err, booksReservations)=>{
            if(err) console.log(err)
            else {
                let id = booksReservations[booksReservations.length-1].id + 1

                let bookReservation = new BookReservationModel({
                    id : id,
                    idB: idB,
                    idR: null,
                    username: username,
                    active: true
                })
                
                bookReservation.save((err, resp)=>{
                    if(err) {
                        console.log(err);
                        res.status(400).json({"message": "notok"})
                    }
                    else res.json({"message": "ok"})
                })
            }
        });      
    }

    getAllBooksReservations= (req: express.Request, res: express.Response)=>{
        
        BookReservationModel.find({}, (err, booksReservations)=>{
            if(err) console.log(err);
            else res.json(booksReservations)
        })
    }

    acceptBookReservation = (req: express.Request, res: express.Response)=>{
        let id = req.body.id      
        let idR = req.body.idR
        BookReservationModel.updateOne({'id': id}, {$set: {'active': false, 'idR': idR}}, (err, resp)=>{
            if(err){
                console.log(err);
                res.status(400).json({"message": "notok"})
            }
             else res.json({"message": "ok"})
        });
    }

    deleteAllBooksReservationsFromUser = (req: express.Request, res: express.Response)=>{
        let username = req.body.username
            
         BookReservationModel.deleteMany({'username': username}, (err, resp)=>{
            if(err){
                console.log(err);
                res.status(400).json({"message": "notok"})
            }
             else res.json({"message": "ok"})
        });
    }

    deleteAllBooksRequestsFromUser = (req: express.Request, res: express.Response)=>{
        let username = req.body.username
            
         BookRequestModel.deleteMany({'username': username}, (err, resp)=>{
            if(err){
                console.log(err);
                res.status(400).json({"message": "notok"})
            }
             else res.json({"message": "ok"})
        });
    }


    deleteAllBooksReservationsForBook= (req: express.Request, res: express.Response)=>{
        let idB = req.body.idB
            
         BookReservationModel.deleteMany({'idB': idB}, (err, resp)=>{
            if(err){
                console.log(err);
                res.status(400).json({"message": "notok"})
            }
             else res.json({"message": "ok"})
        });
    }
}