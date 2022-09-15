"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("../controllers/book.controller");
const bookRouter = express_1.default.Router();
bookRouter.route('/getAllBooks').get((req, res) => new book_controller_1.BookController().getAllBooks(req, res));
bookRouter.route('/updateBook').post((req, res) => new book_controller_1.BookController().updateBook(req, res));
bookRouter.route('/addBook').post((req, res) => new book_controller_1.BookController().addBook(req, res));
bookRouter.route('/changeBookInfo').post((req, res) => new book_controller_1.BookController().changeBookInfo(req, res));
bookRouter.route('/deleteBook').post((req, res) => new book_controller_1.BookController().deleteBook(req, res));
bookRouter.route('/addBookRequest').post((req, res) => new book_controller_1.BookController().addBookRequest(req, res));
bookRouter.route('/getAllBooksRequests').get((req, res) => new book_controller_1.BookController().getAllBooksRequests(req, res));
bookRouter.route('/acceptBookRequest').post((req, res) => new book_controller_1.BookController().acceptBookRequest(req, res));
bookRouter.route('/rejectBookRequest').post((req, res) => new book_controller_1.BookController().rejectBookRequest(req, res));
bookRouter.route('/reserveABook').post((req, res) => new book_controller_1.BookController().reserveABook(req, res));
bookRouter.route('/getAllBooksReservations').get((req, res) => new book_controller_1.BookController().getAllBooksReservations(req, res));
bookRouter.route('/acceptBookReservation').post((req, res) => new book_controller_1.BookController().acceptBookReservation(req, res));
bookRouter.route('/deleteAllBooksReservationsFromUser').post((req, res) => new book_controller_1.BookController().deleteAllBooksReservationsFromUser(req, res));
bookRouter.route('/deleteAllBooksRequestsFromUser').post((req, res) => new book_controller_1.BookController().deleteAllBooksRequestsFromUser(req, res));
bookRouter.route('/deleteAllBooksReservationsForBook').post((req, res) => new book_controller_1.BookController().deleteAllBooksReservationsForBook(req, res));
exports.default = bookRouter;
//# sourceMappingURL=book.routes.js.map