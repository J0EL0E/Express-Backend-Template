import express from "express";
import { 
    cancelEventSchedule, 
    createEventSchedule, 
    deleteEventSchedule, 
    getAllEventSchedules, 
    getEventSchedule, 
    updateEventSchedule 
} from "../controllers/eventController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const eventScheduleRouter = express.Router(); 

eventScheduleRouter.post("/schedule-event", verifyToken, createEventSchedule);
eventScheduleRouter.get("/get-event/:eventId", verifyToken, getEventSchedule);
eventScheduleRouter.get("/get-all-event", verifyToken,  getAllEventSchedules);
eventScheduleRouter.put("/update-event/:eventId", verifyToken,  updateEventSchedule);
eventScheduleRouter.put("/cancel-event/:eventId", verifyToken,  cancelEventSchedule);
eventScheduleRouter.put("/delete-event/:eventId", verifyToken,  deleteEventSchedule);


export default eventScheduleRouter;

