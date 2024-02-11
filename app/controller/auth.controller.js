const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserService = require("../services/auth.service");
const { JWT_SECRET } = require("../../config/config");

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
      let data = req.body;
      let loggedIn = await this.usr_svc.loginUser(data);
      if (loggedIn) {
        if (bcrypt.compareSync(data.password, loggedIn.password)) {
          let token = jwt.sign(
            {
              user_id: loggedIn._id,
            },
            JWT_SECRET
          );
          res.json({
            result: {
              data: data,
              access_token: token,
            },
            status: true,
            msg: "user log in success",
          });
        } else {
          next({
            status: 401,
            msg: "wrong password",
          });
        }
      }
      next({
        status: 401,
        msg: "wrong credentials",
      });
    } catch (error) {
        console.log('login error: ',error)
      next({
        status: 400,
        msg: error,
      });
    }
  };
}
module.exports = AuthController;
