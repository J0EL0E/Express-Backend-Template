import {Schema, model} from "mongoose";

const event = new Schema({
    eventId: {
        type: String,
        required: true
    }, 
    senderId: {
        type: String,
        required: true
    }, 
    senderName: {
        type: String,
        required: true
    },
    senderEmail: {
        type: [String],
        required: true,
        set: val => Array.isArray(val) ? val : [val]
    },
    date: {
        type: String,
        required: true
    }, 
    time: {
        type: String,
        required: true 
    }, 
    receiverName: {
        type: [String],
        required: true
    }, 
    receiverEmail: {
        type: [String],
        required: true
    },
    event_title:{
        type: String,
        required: true,
    }, 
    event_description: {
        type: String,
        required: true
    },
    event_location: {
        type: String,
        required: true
    },
    event_link: {
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
