import eventSchedule from "../models/eventModel.js";
import User from "../models/userModel.js";
import { v4 as uuidv4 } from 'uuid';

export const createEventSchedule =  async (req, res) => {
    try{
        const { senderName, senderEmail, date, time, receiverEmail, receiverName, reason} = req.body;
        const user = await User.find({ email: senderEmail, name: senderName});
        if(!user){
            return res.status(404).json({
                status: "error",
                message: "The user you added doesn't exist"
            });
        }

        const userID = user[0].userId;
        const eventID = uuidv4(); 
        const newEvent = new eventSchedule({
            eventId: eventID,
            senderId: userID,
            senderName: senderName,
            senderEmail: senderEmail,
            date: date,
            time: time,
            receiverName: receiverName,
            receiverEmail: receiverEmail,
            reason: reason,
            status: "scheduled" 
        });
        const isSaved = await newEvent.save();
        if (isSaved){
            res.status(201).json({
                status: "success",
                message: "The event has been saved",
                eventId : eventID
            })            
        }

    }catch (error){
        console.error(error);
        return res.status(500).json({
            status: "error",
            message: "Failed to create a new event schedule."
        })

    }

}

export const getEventSchedule = async (req, res) => {
    try{
        const {eventId} = req.params;

        if(!eventId){
            return res.status(400).json({
                 status: "error",
                message: "The event ID is required."
            })
        }

        const existingEvent = await eventSchedule.find({eventId: eventId});
        if(existingEvent.length > 0){
               res.status(200).json({
                status: "success",
                message: "The event has been retrieved",
                event : existingEvent[0]
            })    
        }  else {
                res.status(404).json({
                status: "error",
                message: "Events not found.",
            })   
        }
        
    } catch{
        console.error(error);
        return res.status(500).json({
            status: "error",
            message: "Failed to retrieve the event schedule."
        })

    }

}

export const getAllEventSchedules = async (req, res) => {
    try{
        const {user_email} = req.query;

        const senderOfEventSchedule = await eventSchedule.find({senderEmail: user_email});
        const receiverOfEventSchedule = await eventSchedule.find({receiverEmail: user_email});

        const listOfEvents = senderOfEventSchedule.concat(receiverOfEventSchedule);

        if(listOfEvents.length > 0){
            res.status(200).json({
                status: "success",
                message: "All of the events has been retrieved",
                event : listOfEvents
            })    
        } else {
                res.status(200).json({
                status: "success",
                message: "No events has been scheduled.",
                event : existingEvent[0]
            })    

        }

    } catch {
           console.error(error);
        return res.status(500).json({
            status: "error",
            message: "Failed to retrieve the event schedules."
        })
    }

}

export const updateEventSchedule = async(req, res) => {
    try{
        const {eventId} = req.params;

        if(!eventId){
            return  res.status(400).json({
                 status: "error",
                message: "The event ID is required."
            })
        }
        const {receiverEmail, receiverName, date, time, reason, status} = req.body;

    
        const eventToBeEdited = await eventSchedule.findOneAndUpdate({eventId: eventId}, {
            receiverEmail: receiverEmail,
            receiverName: receiverName,
            date: date,
            time: time,
            reason: reason,
            status: status ? status : "scheduled"
        })

        if(eventToBeEdited) {
             res.status(200).json({
                status: "success",
                message: "The event is successfully updated",
                event : eventToBeEdited
            })  
        }


    } catch (error) {
           console.error(error);
        return res.status(500).json({
            status: "error",
            message: "Unable to update the event schedule."
        })
    }

}

export const cancelEventSchedule = async (req, res) => {
    try{
        const {eventId} = req.params;

        if(!eventId){
            return  res.status(400).json({
                 status: "error",
                message: "The event ID is required."
            })
        }

        await eventSchedule.findOneAndUpdate({eventId: eventId}, {
           status: canceled
        })

        return res.status(200).json({
            status: "success",
            message: "Event Schedule is successfully cancelled"
        })


    } catch (error){
           console.error(error);
        return res.status(500).json({
            status: "error",
            message: "Unabled to cancel the event schedule."
        })
    }

}

export const deleteEventSchedule = async (req, res) => {
    try{
        const {eventId} = req.params;

        if(!eventId){
            return  res.status(400).json({
                 status: "error",
                message: "The event ID is required."
            })
        }

        await eventSchedule.findOneAndDelete(eventId)

        return res.status(200).json({
            status: "success",
            message: "Event Schedule is successfully deleted"
        })


    } catch (error){
           console.error(error);
        return res.status(500).json({
            status: "error",
            message: "Unabled to delete the event schedule."
        })
    }

}