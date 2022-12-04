'use strict';

const express = require('express')
const app = express()
const port = 3000
const cors = require("cors");
const formData = require("express-form-data");

app.use(cors());
app.use(express.json()); // for parsing application json
app.use(express.urlencoded({extended : true}));
app.use(formData.parse())

const carRouter = require("./routes/carRoute");
app.use("/car", carRouter);

const authRouter = require("./routes/authRoute");
app.use("/auth", authRouter);

const userRouter = require("./routes/userRoute");
app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})