import mongoose from "mongoose";

const Schema = mongoose.Schema;

let User = new Schema({

    id: {
        type:Number
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    fullName: {
        type: String
    },
    address: {
        type: String
    },
    email: {
        type: String
    },
    telephone: {
        type: String
    },
    image: {
        type: String
    },
    status: {
        type: String
    },
    type: {
        type: String
    }
},
{
    versionKey: false 
})

export default mongoose.model('UserModel', User, 'users')