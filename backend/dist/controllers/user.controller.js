"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../models/user"));
class UserController {
    constructor() {
        this.login = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            user_1.default.findOne({ 'username': username, 'password': password }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.register = (req, res) => {
            user_1.default.find({}, (err, users) => {
                if (err)
                    console.log(err);
                else {
                    let id = users[users.length - 1].id + 1;
                    let user = new user_1.default({
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
                    });
                    user.save((err, resp) => {
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
        this.usernameExists = (req, res) => {
            let username = req.body.username;
            user_1.default.findOne({ 'username': username }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.emailExists = (req, res) => {
            let email = req.body.email;
            user_1.default.findOne({ 'email': email }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.changePassword = (req, res) => {
            let username = req.body.username;
            let newpassword = req.body.newpassword;
            user_1.default.updateOne({ 'username': username }, { $set: { 'password': newpassword } }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.adminLogin = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            user_1.default.findOne({ 'username': username, 'password': password, 'type': 'admin' }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.getAllUsers = (req, res) => {
            user_1.default.find({}, (err, users) => {
                if (err)
                    console.log(err);
                else
                    res.json(users);
            });
        };
        this.acceptUser = (req, res) => {
            let username = req.body.username;
            user_1.default.updateOne({ 'username': username }, { $set: { 'status': 'Prihvacen' } }, (err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "message": "notok" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.deleteUser = (req, res) => {
            let username = req.body.username;
            user_1.default.deleteOne({ 'username': username }, (err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "message": "notok" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.changeUser = (req, res) => {
            let id = req.body.id;
            let username = req.body.username;
            let password = req.body.password;
            let fullName = req.body.fullName;
            let address = req.body.address;
            let email = req.body.email;
            let telephone = req.body.telephone;
            let image = req.body.image;
            let status = req.body.status;
            let type = req.body.type;
            user_1.default.updateOne({ 'id': id }, { $set: { 'username': username, 'password': password, 'fullName': fullName, 'address': address, 'email': email, 'telephone': telephone, 'image': image, 'status': status, 'type': type } }, (err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "message": "notok" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.rejectUser = (req, res) => {
            let username = req.body.username;
            user_1.default.updateOne({ 'username': username }, { $set: { 'status': 'Odbijen' } }, (err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "message": "notok" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.upgradeUser = (req, res) => {
            let username = req.body.username;
            user_1.default.updateOne({ 'username': username }, { $set: { 'type': 'moderator' } }, (err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "message": "notok" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.downGradeUser = (req, res) => {
            let username = req.body.username;
            user_1.default.updateOne({ 'username': username }, { $set: { 'type': 'citalac' } }, (err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "message": "notok" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.blockUser = (req, res) => {
            let username = req.body.username;
            user_1.default.updateOne({ 'username': username }, { $set: { 'status': 'Blokiran' } }, (err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "message": "notok" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.unblockUser = (req, res) => {
            let username = req.body.username;
            user_1.default.updateOne({ 'username': username }, { $set: { 'status': 'Prihvacen' } }, (err, resp) => {
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
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map