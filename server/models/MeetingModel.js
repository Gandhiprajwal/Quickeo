const mongoose = require("mongoose");
const meetingSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: [true, "A meeting title is required"],
  },
  date: {
    type: Date,
  },
  time: {
    type: Date,
    required: true,
  },
  status: {
    type: Boolean,
  },
  meetingId:{
    type:String,
  },
  createdAt: {
    type: Date,
  },
});

meetingSchema.pre(/^find/, function (next) {
  this.populate({
    path: "owner",
  });
  next();
});

const MeetingModel = mongoose.model("Meeting", meetingSchema);
module.exports = MeetingModel;
