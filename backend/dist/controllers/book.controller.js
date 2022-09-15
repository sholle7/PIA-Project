"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const book_1 = __importDefault(require("../models/book"));
const bookRequest_1 = __importDefault(require("../models/bookRequest"));
const bookReservation_1 = __importDefault(require("../models/bookReservation"));
class BookController {
    constructor() {
        this.getAllBooks = (req, res) => {
            book_1.default.find({}, (err, books) => {
                if (err)
                    console.log(err);
                else
                    res.json(books);
            });
        };
        this.updateBook = (req, res) => {
            let id = req.body.id;
            let amount = req.body.amount;
            book_1.default.updateOne({ 'id': id }, { $inc: { 'amount': amount } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ "message": "ok" });
            });
        };
        this.addBook = (req, res) => {
            let name = req.body.name;
            let publisher = req.body.publisher;
            let year = req.body.year;
            let language = req.body.language;
            let coverPicture = req.body.coverPicture;
            let authors = req.body.authors;
            let genres = req.body.genres;
            let amount = req.body.amount;
            book_1.default.find({}, (err, books) => {
                if (err)
                    console.log(err);
                else {
                    let id = books[books.length - 1].id + 1;
                    let book = new book_1.default({
                        id: id,
                        name: name,
                        publisher: publisher,
                        year: year,
                        language: language,
                        coverPicture: coverPicture,
                        authors: authors,
                        genres: genres,
                        amount: amount
                    });
                    book.save((err, resp) => {
                        if (err) {
                            console.log(err);
                            res.status(400).json({ "message": "notok" });
                        }
                        else
                            res.json({ "message": "ok" });
                    });
                }
            });
        };
        this.changeBookInfo = (req, res) => {
            let id = req.body.id;
            let name = req.body.name;
            let publisher = req.body.publisher;
            let year = req.body.year;
            let language = req.body.language;
            let coverPicture = req.body.coverPicture;
            let authors = req.body.authors;
            let genres = req.body.genres;
            let amount = req.body.amount;
            book_1.default.updateOne({ 'id': id }, { $set: { 'name': name, 'publisher': publisher, 'year': year, 'language': language, 'coverPicture': coverPicture, 'authors': authors, 'genres': genres, 'amount': amount } }, (err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "message": "notok" });
                }
                else
                    res.json({ 'message': 'ok' });
            });
        };
        this.deleteBook = (req, res) => {
            let id = req.body.id;
            book_1.default.deleteOne({ 'id': id }, (err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "message": "notok" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.addBookRequest = (req, res) => {
            let name = req.body.name;
            let publisher = req.body.publisher;
            let year = req.body.year;
            let language = req.body.language;
            let coverPicture = req.body.coverPicture;
            let status = req.body.status;
            let authors = req.body.authors;
            let genres = req.body.genres;
            let amount = req.body.amount;
            let username = req.body.username;
            bookRequest_1.default.find({}, (err, booksRequests) => {
                if (err)
                    console.log(err);
                else {
                    let id = booksRequests[booksRequests.length - 1].id + 1;
                    let bookRequest = new bookRequest_1.default({
                        id: id,
                        name: name,
                        publisher: publisher,
                        year: year,
                        language: language,
                        coverPicture: coverPicture,
                        status: status,
                        authors: authors,
                        genres: genres,
                        amount: amount,
                        username: username
                    });
                    bookRequest.save((err, resp) => {
                        if (err) {
                            console.log(err);
                            res.status(400).json({ "message": "notok" });
                        }
                        else
                            res.json({ "message": "ok" });
                    });
                }
            });
        };
        this.getAllBooksRequests = (req, res) => {
            bookRequest_1.default.find({}, (err, booksRequests) => {
                if (err)
                    console.log(err);
                else
                    res.json(booksRequests);
            });
        };
        this.acceptBookRequest = (req, res) => {
            let id = req.body.id;
            bookRequest_1.default.updateOne({ 'id': id }, { $set: { 'status': 'Prihvacen' } }, (err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "message": "notok" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.rejectBookRequest = (req, res) => {
            let id = req.body.id;
            bookRequest_1.default.updateOne({ 'id': id }, { $set: { 'status': 'Odbijen' } }, (err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "message": "notok" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.reserveABook = (req, res) => {
            let idB = req.body.idB;
            let username = req.body.username;
            bookReservation_1.default.find({}, (err, booksReservations) => {
                if (err)
                    console.log(err);
                else {
                    let id = booksReservations[booksReservations.length - 1].id + 1;
                    let bookReservation = new bookReservation_1.default({
                        id: id,
                        idB: idB,
                        idR: null,
                        username: username,
                        active: true
                    });
                    bookReservation.save((err, resp) => {
                        if (err) {
                            console.log(err);
                            res.status(400).json({ "message": "notok" });
                        }
                        else
                            res.json({ "message": "ok" });
                    });
                }
            });
        };
        this.getAllBooksReservations = (req, res) => {
            bookReservation_1.default.find({}, (err, booksReservations) => {
                if (err)
                    console.log(err);
                else
                    res.json(booksReservations);
            });
        };
        this.acceptBookReservation = (req, res) => {
            let id = req.body.id;
            let idR = req.body.idR;
            bookReservation_1.default.updateOne({ 'id': id }, { $set: { 'active': false, 'idR': idR } }, (err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "message": "notok" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.deleteAllBooksReservationsFromUser = (req, res) => {
            let username = req.body.username;
            bookReservation_1.default.deleteMany({ 'username': username }, (err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "message": "notok" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.deleteAllBooksRequestsFromUser = (req, res) => {
            let username = req.body.username;
            bookRequest_1.default.deleteMany({ 'username': username }, (err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "message": "notok" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.deleteAllBooksReservationsForBook = (req, res) => {
            let idB = req.body.idB;
            bookReservation_1.default.deleteMany({ 'idB': idB }, (err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "message": "notok" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
    }
}
exports.BookController = BookController;
//# sourceMappingURL=book.controller.js.map