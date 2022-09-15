"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let User = new Schema({
    id: {
        type: Number
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    fullName: {
        type: String
    },
    address: {
        type: String
    },
    email: {
        type: String
    },
    telephone: {
        type: String
    },
    image: {
        type: String
    },
    status: {
        type: String
    },
    type: {
        type: String
    }
}, {
    versionKey: false
});
exports.default = mongoose_1.default.model('UserModel', User, 'users');
//# sourceMappingURL=user.js.map