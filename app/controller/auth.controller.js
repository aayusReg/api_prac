const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserService = require("../services/auth.service");

class AuthController {
  constructor() {
    this.usr_svc = new UserService();
  }
  registerUser = async (req, res, next) => {
    try {
      let body = req.body;
      if (req.file) {
        body.image = req.file.filename;
      }
      this.usr_svc.validateUser(body);
      body.password = bcrypt.hashSync(body.password, 10);
      let createUser = await this.usr_svc.registerUser();
      res.json({
        status: true,
        result: createUser,
        msg: "user registered",
      });
    } catch (error) {
      next({
        status: 400,
        msg: "user registration failed",
      });
    }
  };
  loginUser = async (req, res, next) => {
    try {
    } catch (error) {}
  };
}
module.exports = AuthController;
