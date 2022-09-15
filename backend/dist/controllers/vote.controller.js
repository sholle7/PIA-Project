"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoteController = void 0;
const vote_1 = __importDefault(require("../models/vote"));
class VoteController {
    constructor() {
        this.getAllVotes = (req, res) => {
            vote_1.default.find({}, (err, votes) => {
                if (err)
                    console.log(err);
                else
                    res.json(votes);
            });
        };
        this.addComment = (req, res) => {
            let idB = req.body.idB;
            let username = req.body.username;
            let rating = req.body.rating;
            let text = req.body.text;
            let date = req.body.date;
            let time = req.body.time;
            vote_1.default.find({}, (err, votes) => {
                if (err)
                    console.log(err);
                else {
                    let id = votes[votes.length - 1].id + 1;
                    let vote = new vote_1.default({
                        id: id,
                        idB: idB,
                        username: username,
                        rating: rating,
                        text: text,
                        date: date,
                        time: time,
                        isUpdated: false
                    });
                    vote.save((err, resp) => {
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
        this.hasUserCommented = (req, res) => {
            let username = req.body.username;
            let idB = req.body.idB;
            vote_1.default.find({ 'username': username, 'idB': idB }, (err, votes) => {
                if (err)
                    console.log(err);
                else
                    res.json(votes);
            });
        };
        this.updateComment = (req, res) => {
            let text = req.body.text;
            let id = req.body.id;
            let rating = req.body.rating;
            let date = req.body.date;
            let time = req.body.time;
            vote_1.default.updateOne({ 'id': id }, { $set: { 'isUpdated': true, 'text': text, 'rating': rating, 'date': date, 'time': time } }, (err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "message": "notok" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.deleteAllVotesFromUser = (req, res) => {
            let username = req.body.username;
            vote_1.default.deleteMany({ 'username': username }, (err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "message": "notok" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.deleteAllVotesForBook = (req, res) => {
            let idB = req.body.idB;
            vote_1.default.deleteMany({ 'idB': idB }, (err, resp) => {
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
exports.VoteController = VoteController;
//# sourceMappingURL=vote.controller.js.map