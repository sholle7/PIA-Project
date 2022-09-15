import mongoose from "mongoose";

const Schema = mongoose.Schema;

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
},
{
    versionKey: false 
})

export default mongoose.model('VoteModel', Vote, 'votes')