import {Schema, model} from "mongoose";

const event = new Schema({
    eventId: {
        type: String,
        required: true
    }, 
    userId: {
        type: String,
        required: true
    }, 
    date: {
        type: String,
        required: true
    }, 
    time: {
        type: String,
        required: true 
    }, 
    clientName: {
        type: String,
        required: true
    }, 
    clientEmail: {
        type: String,
        required: true
    }, 
    reason: {
        type: String,
        required: true
    }, 
    status: {
        type: String,
        required: true
    }
});

const eventSchedule = model("eventSchedule", event, "eventSchedules")
export default eventSchedule;
