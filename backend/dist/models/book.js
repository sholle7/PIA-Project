"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Book = new Schema({
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
    authors: {
        type: Array
    },
    genres: {
        type: Array
    },
    amount: {
        type: Number
    }
}, {
    versionKey: false
});
exports.default = mongoose_1.default.model('BookModel', Book, 'books');
//# sourceMappingURL=book.js.map