import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import globalErrorHandler from "./middleware/globalErrorHandler.js";
import loginRouter from "./routes/login.js";
import registerUserRouter from "./routes/userRegister.js";

const app = express();

dotenv.config();

// connect to mongodb
mongoose.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@giorgiocluster.etfayma.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
);



// check mongodb connection
mongoose.connection.on("open", () =>
    console.log("Database connection established!")
);
mongoose.connection.on("error", () => console.error);

// allow cors requests
app.use(cors({ origin: "*", credentials: true }));

// parse JSON data received
app.use(express.json());

// Use morgan to make a small log every time a request is received
app.use(morgan("tiny"));

// app.use("/home", enterPage);

// login post
app.use("/signin", loginRouter);

// register general user
app.use("/signup", registerUserRouter);

// app.use('/posts', postRoutes);

app.use(globalErrorHandler);

app.listen(3000 || process.env.PORT, () => {
    console.log(`Server has started on port  3000!`);
});