import {Schema, model} from "mongoose";

const refreshToken = new Schema({
    token:{
        type: String,
        required: true
    }

})

const refreshTokenModel = model("refreshToken", refreshToken, "refresh_tokens")
export default refreshTokenModel