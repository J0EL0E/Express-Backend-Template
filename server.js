import express from  "express";
import connectToMongoDB from "./config/mongodbConfig.js";
import {
    authRouter,
    eventScheduleRouter,
} from "./routes/index.js";
// import authRouter from "./routes/authRoutes.js";


const app = express();
const PORT = 3000;

await connectToMongoDB();

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to AI scheduler API");
});

app.use("/api/v1", authRouter);
app.use("/api/v1", eventScheduleRouter);


app.use((req, res) => {
    res.send("Route not found.");

})


app.listen(PORT, () => {
    console.log(`Listening from port ${PORT}`);
});