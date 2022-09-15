import mongoose from "mongoose";

const Schema = mongoose.Schema;

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

},
{
    versionKey: false 
})

export default mongoose.model('BookRequestModel', BookRequest, 'booksRequests')