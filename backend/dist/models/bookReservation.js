"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let BookReservation = new Schema({
    id: {
        type: Number
    },
    idB: {
        type: Number
    },
    idR: {
        type: Number
    },
    username: {
        type: String
    },
    active: {
        type: Boolean
    }
}, {
    versionKey: false
});
exports.default = mongoose_1.default.model('BookReservationModel', BookReservation, 'booksReservations');
//# sourceMappingURL=bookReservation.js.map