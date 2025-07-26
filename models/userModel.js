import {Schema, model} from "mongoose"

const user = new Schema({
    userId: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }, 
    password: {
        type: String,
        required: true,
    },
    agreeToTerms: {
        type: String
    },
    availability: {
        type: Boolean,
        required: true,
    }, 

});

const User = model("User", user, "users");
export default User; 