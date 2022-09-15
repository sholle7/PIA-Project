"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rental_controller_1 = require("../controllers/rental.controller");
const rentalRouter = express_1.default.Router();
rentalRouter.route('/getAllRentals').get((req, res) => new rental_controller_1.RentalController().getAllRentals(req, res));
rentalRouter.route('/getAllRentalsFromUser').post((req, res) => new rental_controller_1.RentalController().getAllRentalsFromUser(req, res));
rentalRouter.route('/returnTheBook').post((req, res) => new rental_controller_1.RentalController().returnTheBook(req, res));
rentalRouter.route('/userHasBook').post((req, res) => new rental_controller_1.RentalController().userHasBook(req, res));
rentalRouter.route('/rentABook').post((req, res) => new rental_controller_1.RentalController().rentABook(req, res));
rentalRouter.route('/hasUserRentedTheBook').post((req, res) => new rental_controller_1.RentalController().hasUserRentedTheBook(req, res));
rentalRouter.route('/isBookRented').post((req, res) => new rental_controller_1.RentalController().isBookRented(req, res));
rentalRouter.route('/userHasBookRented').post((req, res) => new rental_controller_1.RentalController().userHasBookRented(req, res));
rentalRouter.route('/extendTheBook').post((req, res) => new rental_controller_1.RentalController().extendTheBook(req, res));
rentalRouter.route('/deleteAllRentalsFromUser').post((req, res) => new rental_controller_1.RentalController().deleteAllRentalsFromUser(req, res));
rentalRouter.route('/deleteAllRentalsForBook').post((req, res) => new rental_controller_1.RentalController().deleteAllRentalsForBook(req, res));
exports.default = rentalRouter;
//# sourceMappingURL=rental.routes.js.map