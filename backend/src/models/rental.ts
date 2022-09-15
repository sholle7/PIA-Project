import mongoose from "mongoose";

const Schema = mongoose.Schema;

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
},
{
    versionKey: false 
})

export default mongoose.model('RentalModel', Rental, 'rentals')