if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const middleware = require("./middlewares");
const mongoose = require("mongoose");
const UserModel = require("./models/UserModel");
const MeetingModel = require("./models/MeetingModel");
const ShortUniqueId = require("short-unique-id");
const path = require("path");

const app = express();
const port = process.env.PORT || 9000;

// middleware initialization
app.use(cors());
app.use(middleware.decodeToken); // Affect every routes
app.use(bodyParser.json());

// connection mongoDB
mongoose
  .connect(`${process.env.MONGO_DB_URL}/quickeo`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("Connection to mongodb established");
  })
  .catch((err) => {
    console.log("Error connecting to mongodb server because " + err.message);
  });

// routes
// app.get("/", (req, res) => {
//   res.json({
//     message: "Welcome to voom api",
//     status: "sucess",
//   });
// });

app.post("/login", async (req, res) => {
  // console.log(req.user);
  const { uid, name, email, picture } = req.user;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      await UserModel.findOneAndUpdate(
        { email },
        {
          uid,
          displayName: name,
          email,
          photoURL: picture,
        }
      );
    } else {
      await UserModel.create({
        uid,
        displayName: name,
        email,
        photoURL: picture,
        createdAt: Date.now(),
      });
    }
    res.json({
      message: "User logged in successfully",
      status: "success",
    });
  } catch (e) {
    res.json({
      message: "An error occured while logging in user" + e.message,
      status: "error",
    });
  }
});

app.post("/create-meeting", middleware.userExists, async (req, res) => {
  try {
    const { title, date, time } = req.body;
    const { randomUUID } = new ShortUniqueId();
    await MeetingModel.create({
      owner: req.user.id,
      title,
      date,
      time,
      status: true,
      meetingId: randomUUID(),
      createdAt: Date.now(),
    });
    res.json({
      message: "Meeting created successfully",
      status: "success",
    });
  } catch (e) {
    res.json({
      message: "An error occured while creating meeting" + e.message,
      status: "error",
    });
  }
});

app.post("/edit-meeting/:id", middleware.userExists, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, date, time, status } = req.body;
    await MeetingModel.findOneAndUpdate(
      { _id: id },
      {
        title,
        date,
        time,
        status,
      }
    );
    res.json({
      message: "Meeting updated successfully",
      status: "success",
    });
  } catch (e) {
    res.json({
      message: "An error occured while updating meeting" + e.message,
      status: "error",
    });
  }
});

app.get("/my-meetings", middleware.userExists, async (req, res) => {
  try {
    const myMeetings = await MeetingModel.find({ owner: req.user.id }).sort({
      createdAt: -1,
    });
    res.json({
      message: myMeetings,
      status: "success",
    });
  } catch (e) {
    res.json({
      message: "An error occured while fetching meetings" + e.message,
      status: "error",
    });
  }
});

app.get("/get-single-meeting/:meetingId", async (req, res) => {
  try {
    const singleMeeting = await MeetingModel.findOne({
      meetingId: req.params.meetingId,
    });
    res.json({
      message: singleMeeting,
      status: "success",
    });
  } catch (e) {
    res.json({
      message: "An error occured while fetching meeting" + e.message,
      status: "error",
    });
  }
});

// server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
