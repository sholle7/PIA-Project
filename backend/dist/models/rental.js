"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Rental = new Schema({
    id: {
        type: Number
    },
    idB: {
        type: Number
    },
    username: {
        type: String
    },
    startDate: {
        type: String
    },
    endDate: {
        type: String
    },
    active: {
        type: Boolean
    },
    returnDate: {
        type: String
    },
    hasExtended: {
        type: Boolean
    }
}, {
    versionKey: false
});
exports.default = mongoose_1.default.model('RentalModel', Rental, 'rentals');
//# sourceMappingURL=rental.js.map