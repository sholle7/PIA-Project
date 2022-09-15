import mongoose from "mongoose";

const Schema = mongoose.Schema;

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
},
{
    versionKey: false 
})

export default mongoose.model('BookReservationModel', BookReservation, 'booksReservations')