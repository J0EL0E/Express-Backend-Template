import express from "express";
import { 
    cancelEventSchedule, 
    createEventSchedule, 
    getAllEventSchedules, 
    getEventSchedule, 
    updateEventSchedule 
} from "../controllers/eventController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const eventScheduleRouter = express.Router(); 

eventScheduleRouter.post("/schedule-event", verifyToken, createEventSchedule);
eventScheduleRouter.get("/get-event", verifyToken,  getEventSchedule);
eventScheduleRouter.get("/get-all-event", verifyToken,  getAllEventSchedules);
eventScheduleRouter.put("/update-event", verifyToken,  updateEventSchedule);
eventScheduleRouter.delete("/cancel-event", verifyToken,  cancelEventSchedule);

export default eventScheduleRouter;

