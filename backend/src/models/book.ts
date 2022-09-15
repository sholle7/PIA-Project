import mongoose from "mongoose";

const Schema = mongoose.Schema;

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

},
{
    versionKey: false 
})

export default mongoose.model('BookModel', Book, 'books')