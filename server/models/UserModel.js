const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  uid: String,
  email: {
    type: String,
    required: [true, "an email address is required"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  photoURL: String,
  displayName: String,
  createdAt: {
    type: Date,
  },
});

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;