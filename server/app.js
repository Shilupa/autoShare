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
const passport = require("./utils/passport");
const bookingRouter = require("./routes/bookingRoute");
const profileRouter = require("./routes/profileRoute");
const pictureRouter = require("./routes/pictureRoute");

app.use(cors());
app.use(express.json()); // for parsing application json
app.use(express.urlencoded({ extended: true }));
//app.use(formData.parse())

//serve uploaded files
app.use(express.static("uploads"));
app.use("/thumbnails", express.static("thumbnails"));

app.use("/auth", authRouter);
app.use("/user", userRouter);

// Car route for non authentication
app.use("/car", carRouter);
// Car route for authentication
app.use("/car", passport.authenticate("jwt", { session: false }), carRouter);
app.use("/booking", bookingRouter);
app.use("/pictures", pictureRouter);
app.use(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  profileRouter
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
