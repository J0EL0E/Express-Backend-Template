import eventSchedule from "../models/eventModel.js";
import User from "../models/userModel.js";
import { v4 as uuidv4 } from 'uuid';

export const createEventSchedule =  async (req, res) => {
    try{
        const { userName, email, date, time, clientName, clientEmail, reason} = req.body;
        const user = await User.find({ name: { $regex: /Monkey/i }});
        if(!user){
            return res.status(404).json({
                status: "error",
                message: "The user you added doesn't exist"
            });
        }
        console.log(user)
        const userID = user[0].userId;
        console.log(userID)
        const newEvent = new eventSchedule({
            eventId: uuidv4(),
            userId: userID,
            date: date,
            time: time,
            clientName: clientName,
            clientEmail: clientEmail,
            reason: reason,
            status: "scheduled" 
        });
        const isSaved = await newEvent.save();
        console.log(isSaved);

        res.status(201).json({
            status: "success",
            message: "The event has been saved"
        })

    }catch (error){
        console.error(error);
        return res.status(500).json({
            status: "error",
            message: "Failed to create a new event schedule."
        })

    }

}

export const getEventSchedule = (req, res) => {
    try{

    } catch{

    }

}

export const getAllEventSchedules = (req, res) => {

}

export const updateEventSchedule = (req, res) => {

}

export const cancelEventSchedule = (req, res) => {

}