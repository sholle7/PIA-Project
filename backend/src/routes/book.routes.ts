import express from 'express'
import { BookController } from '../controllers/book.controller';

const bookRouter = express.Router();

bookRouter.route('/getAllBooks').get(
    (req, res)=>new BookController().getAllBooks(req, res)
)

bookRouter.route('/updateBook').post(
    (req, res)=>new BookController().updateBook(req, res)
)

bookRouter.route('/addBook').post(
    (req, res)=>new BookController().addBook(req, res)
)

bookRouter.route('/changeBookInfo').post(
    (req, res)=>new BookController().changeBookInfo(req, res)
)

bookRouter.route('/deleteBook').post(
    (req, res)=>new BookController().deleteBook(req, res)
)

bookRouter.route('/addBookRequest').post(
    (req, res)=>new BookController().addBookRequest(req, res)
)

bookRouter.route('/getAllBooksRequests').get(
    (req, res)=>new BookController().getAllBooksRequests(req, res)
)

bookRouter.route('/acceptBookRequest').post(
    (req, res)=>new BookController().acceptBookRequest(req, res)
)

bookRouter.route('/rejectBookRequest').post(
    (req, res)=>new BookController().rejectBookRequest(req, res)
)

bookRouter.route('/reserveABook').post(
    (req, res)=>new BookController().reserveABook(req, res)
)

bookRouter.route('/getAllBooksReservations').get(
    (req, res)=>new BookController().getAllBooksReservations(req, res)
)

bookRouter.route('/acceptBookReservation').post(
    (req, res)=>new BookController().acceptBookReservation(req, res)
)

bookRouter.route('/deleteAllBooksReservationsFromUser').post(
    (req, res)=>new BookController().deleteAllBooksReservationsFromUser(req, res)
)

bookRouter.route('/deleteAllBooksRequestsFromUser').post(
    (req, res)=>new BookController().deleteAllBooksRequestsFromUser(req, res)
)

bookRouter.route('/deleteAllBooksReservationsForBook').post(
    (req, res)=>new BookController().deleteAllBooksReservationsForBook(req, res)
)


export default bookRouter;