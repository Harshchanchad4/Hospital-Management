const express = require("express");

const app = express();
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinaryConnect");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const messageRouter = require("./router/messageRouter");
const userRouter = require("./router/userRouter");
const appointentRouter = require("./router/appointmentRouter");
const { errorMiddleware } = require("./middlewares/errorMiddleware");



cloudinaryConnect();


app.use(cors());

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
    })
);
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointentRouter);
app.use(errorMiddleware);


app.get("/", () => {
    console.log("hello world");

})

database.connect();

app.listen(4000, () => {
    console.log("Server started listening on port 4000");
});

