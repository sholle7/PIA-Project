"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Vote = new Schema({
    id: {
        type: Number
    },
    idB: {
        type: Number
    },
    username: {
        type: String
    },
    rating: {
        type: Number
    },
    text: {
        type: String
    },
    date: {
        type: String
    },
    time: {
        type: String
    },
    isUpdated: {
        type: Boolean
    }
}, {
    versionKey: false
});
exports.default = mongoose_1.default.model('VoteModel', Vote, 'votes');
//# sourceMappingURL=vote.js.map