const admin = require("../config/firebase");
const UserModel = require("../models/UserModel");

class Middleware {
  async decodeToken(req, res, next) {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = await admin.auth().verifyIdToken(token);
        if (decodedToken) {
          req.user = decodedToken;
          return next();
        }
        return res.json({
          message: "Unauthorized to access this resource",
          status: "fail",
        });
      } else {
        throw new Error("Your request was not with authorization token");
      }
    } catch (e) {
      res.json({
        message: "Internal server error because" + e.message,
        status: "error",
      });
    }
  }
  async userExists(req, res, next) {
    try {
      const user = await UserModel.findOne({ email: req.user.email });
      if (user) {
        req.user = user;
        return next();
      }
      return res.json({
        message: "Error occured because user does not exist",
        status: "fail",
      });
    } catch (err) {
      res.json({
        message: "Internal Server error because" + e.message,
        status: "error",
      });
    }
  }
}

module.exports = new Middleware();
