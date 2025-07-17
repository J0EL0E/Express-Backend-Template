import {Schema, model} from "mongoose"

const user = new Schema({
    email: {
        type: String,
        required: true,
    }, 
    password: {
        type: String,
        required: true,
    }
});

const User = model("User", user, "users");
export default User; 