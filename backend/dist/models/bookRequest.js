"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let BookRequest = new Schema({
    id: {
        type: Number
    },
    name: {
        type: String
    },
    publisher: {
        type: String
    },
    year: {
        type: Number
    },
    language: {
        type: String
    },
    coverPicture: {
        type: String
    },
    status: {
        type: String
    },
    authors: {
        type: Array
    },
    genres: {
        type: Array
    },
    amount: {
        type: Number
    },
    username: {
        type: String
    }
}, {
    versionKey: false
});
exports.default = mongoose_1.default.model('BookRequestModel', BookRequest, 'booksRequests');
//# sourceMappingURL=bookRequest.js.map