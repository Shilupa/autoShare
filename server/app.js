"use strict";

const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
//const formData = require("express-form-data");
// routes
const carRouter = require("./routes/carRoute");
const authRouter = require("./routes/authRoute");
const userRouter = require("./routes/userRoute");
const bookingRouter = require("./routes/bookingRoute");

app.use(cors());
app.use(express.json()); // for parsing application json
app.use(express.urlencoded({ extended: true }));
//app.use(formData.parse())

app.use("/car", carRouter);
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/booking", bookingRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
