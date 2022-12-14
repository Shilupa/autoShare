"use strict";

const express = require("express");
const cookieParser = require('cookie-parser');
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

//cookie
app.use(cookieParser());

//serve uploaded files
app.use(express.static("uploads"));
app.use("/thumbnails", express.static("thumbnails"));

// Car route for non authentication
app.use("/car", carRouter);
app.use("/auth", authRouter);

// routes with authentication
app.use("/user", passport.authenticate("jwt", { session: false }), userRouter);
app.use("/car", passport.authenticate("jwt", { session: false }), carRouter);
app.use(
  "/booking",
  passport.authenticate("jwt", { session: false }),
  bookingRouter
);
app.use(
  "/pictures",
  passport.authenticate("jwt", { session: false }),
  pictureRouter
);
app.use(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  profileRouter
);

app.get('/setCookie', (req, res) => {
  res.cookie('foo','bar');
  res.send('cookie is set foo is bar');
});

app.get('/getCookie',(req,res)=>{
  console.log(req.cookies);
  res.send(req.cookies);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
