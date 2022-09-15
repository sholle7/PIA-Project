import express from 'express'
import { RentalController } from '../controllers/rental.controller';

const rentalRouter = express.Router();

rentalRouter.route('/getAllRentals').get(
    (req, res)=>new RentalController().getAllRentals(req, res)
)

rentalRouter.route('/getAllRentalsFromUser').post(
    (req, res)=>new RentalController().getAllRentalsFromUser(req, res)
)

rentalRouter.route('/returnTheBook').post(
    (req, res)=>new RentalController().returnTheBook(req, res)
)

rentalRouter.route('/userHasBook').post(
    (req, res)=>new RentalController().userHasBook(req, res)
)


rentalRouter.route('/rentABook').post(
    (req, res)=>new RentalController().rentABook(req, res)
)

rentalRouter.route('/hasUserRentedTheBook').post(
    (req, res)=>new RentalController().hasUserRentedTheBook(req, res)
)

rentalRouter.route('/isBookRented').post(
    (req, res)=>new RentalController().isBookRented(req, res)
)

rentalRouter.route('/userHasBookRented').post(
    (req, res)=>new RentalController().userHasBookRented(req, res)
)
rentalRouter.route('/extendTheBook').post(
    (req, res)=>new RentalController().extendTheBook(req, res)
)


rentalRouter.route('/deleteAllRentalsFromUser').post(
    (req, res)=>new RentalController().deleteAllRentalsFromUser(req, res)
)

rentalRouter.route('/deleteAllRentalsForBook').post(
    (req, res)=>new RentalController().deleteAllRentalsForBook(req, res)
)





export default rentalRouter;