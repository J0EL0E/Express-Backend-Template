import {Schema, model} from "mongoose"

const user = new Schema({
    userId: {
        type: String,
        required: true,
    },
    name: {
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
    availability: {
        type: Boolean,
        required: true,
    }, 

});

const User = model("User", user, "users");
export default User; 