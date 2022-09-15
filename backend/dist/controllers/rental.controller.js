"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentalController = void 0;
const rental_1 = __importDefault(require("../models/rental"));
class RentalController {
    constructor() {
        this.getAllRentals = (req, res) => {
            rental_1.default.find({}, (err, rentals) => {
                if (err)
                    console.log(err);
                else
                    res.json(rentals);
            });
        };
        this.getAllRentalsFromUser = (req, res) => {
            let username = req.body.username;
            rental_1.default.find({ 'username': username }, (err, rentals) => {
                if (err)
                    console.log(err);
                else
                    res.json(rentals);
            });
        };
        this.returnTheBook = (req, res) => {
            let idB = req.body.idB;
            let id = req.body.id;
            let returnDate = req.body.returnDate;
            rental_1.default.updateOne({ 'id': id, 'idB': idB }, { $set: { 'returnDate': returnDate, 'active': false } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ "message": 'ok' });
            });
        };
        this.userHasBook = (req, res) => {
            let idB = req.body.idB;
            let username = req.body.username;
            rental_1.default.find({ 'idB': idB, 'username': username, 'active': true }, (err, rentals) => {
                if (err)
                    console.log(err);
                else {
                    if (rentals.length > 0)
                        res.json({ "message": 'ima' });
                    else
                        res.json({ "message": 'nema' });
                }
            });
        };
        this.rentABook = (req, res) => {
            let idB = req.body.idB;
            let username = req.body.username;
            let daysRent = req.body.daysRent;
            let stDate = new Date();
            let startDate = stDate.getFullYear() + "-"
                + ('0' + (stDate.getMonth() + 1)).slice(-2) + '-'
                + ('0' + stDate.getDate()).slice(-2);
            let date = new Date();
            date.setDate(date.getDate() + daysRent);
            let endDate = date.getFullYear() + "-"
                + ('0' + (date.getMonth() + 1)).slice(-2) + '-'
                + ('0' + date.getDate()).slice(-2);
            rental_1.default.find({}, (err, rentals) => {
                if (err)
                    console.log(err);
                else {
                    let id = rentals[rentals.length - 1].id + 1;
                    let rental = new rental_1.default({
                        id: id,
                        idB: idB,
                        username: username,
                        startDate: startDate,
                        endDate: endDate,
                        active: true,
                        returnDate: null,
                        hasExtended: false
                    });
                    rental.save((err, resp) => {
                        if (err) {
                            console.log(err);
                            res.status(400).json({ "message": "error" });
                        }
                        else
                            res.json({ "message": "ok" });
                    });
                }
            });
        };
        this.hasUserRentedTheBook = (req, res) => {
            let username = req.body.username;
            let idB = req.body.idB;
            rental_1.default.find({ 'username': username, 'idB': idB }, (err, rentals) => {
                if (err)
                    console.log(err);
                else {
                    if (rentals.length > 0)
                        res.json({ "message": 'jeste' });
                    else
                        res.json({ "message": 'nije' });
                }
            });
        };
        this.isBookRented = (req, res) => {
            let idB = req.body.idB;
            rental_1.default.find({ 'active': true, 'idB': idB }, (err, rentals) => {
                if (err)
                    console.log(err);
                else {
                    if (rentals.length > 0)
                        res.json({ "message": 'jeste' });
                    else
                        res.json({ "message": 'nije' });
                }
            });
        };
        this.userHasBookRented = (req, res) => {
            let username = req.body.username;
            rental_1.default.find({ 'active': true, 'username': username }, (err, rentals) => {
                if (err)
                    console.log(err);
                else {
                    if (rentals.length > 0)
                        res.json({ "message": 'jeste' });
                    else
                        res.json({ "message": 'nije' });
                }
            });
        };
        this.extendTheBook = (req, res) => {
            let id = req.body.id;
            let days = req.body.days;
            rental_1.default.findOne({ 'id': id }, (err, rental) => {
                if (err)
                    console.log(err);
                else {
                    if (rental) {
                        let currentDate = rental.endDate;
                        let date = new Date(currentDate);
                        date.setDate(date.getDate() + days);
                        let endDate = date.getFullYear() + "-"
                            + ('0' + (date.getMonth() + 1)).slice(-2) + '-'
                            + ('0' + date.getDate()).slice(-2);
                        rental_1.default.updateOne({ 'id': id }, { $set: { 'endDate': endDate, 'hasExtended': true } }, (err, resp) => {
                            if (err)
                                console.log(err);
                            else
                                res.json({ "message": 'ok' });
                        });
                    }
                    else {
                        res.json({ "message": 'notok' });
                    }
                }
            });
        };
        this.deleteAllRentalsFromUser = (req, res) => {
            let username = req.body.username;
            rental_1.default.deleteMany({ 'username': username }, (err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "message": "notok" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.deleteAllRentalsForBook = (req, res) => {
            let idB = req.body.idB;
            rental_1.default.deleteMany({ 'idB': idB }, (err, resp) => {
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
exports.RentalController = RentalController;
//# sourceMappingURL=rental.controller.js.map