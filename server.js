import express from  "express";
import connectToMongoDB from "./config/mongodbConfig.js";
import {
    authRouter,
    eventScheduleRouter,
} from "./routes/index.js";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 4000;

var allowedOrigin  = ['http://localhost:3000']
var corsOptions = {
  origin: function (origin, callback) {
     if (!origin) return callback(null, true);
    if (allowedOrigin.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}

await connectToMongoDB();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

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