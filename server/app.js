'use strict';

const express = require('express')
const app = express()
const port = 3000
const cors = require("cors");


app.use(cors());

const carRouter = require("./routes/carRoute");
app.use("/car", carRouter);

const authRouter = require("./routes/authRoute");
app.use("/auth", authRouter);

const userRouter = require("./routes/userRoute");
app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})