const jwt = require("jsonwebtoken");
const UserService = require("../services/auth.service");
const { JWT_SECRET } = require("../../config/config");
const user_svc = new UserService();
const auth = async (req, res, next) => {
 

  try {
    let token = null;
    if (req.headers["authorization"]) {
      token = req.headers["authorization"];
    } else if (req.headers["x-xsrf-token"]) {
      token = req.headers["x-xsrf-token"];
    } else if (req.query["token"]) {
      token = req.query["token"];
    }

    if (token === null) {
      next({
        status: 401,
        msg: "token not provided",
      });
    } else {
      let token_split = token.split(' ');
      token = token_split.pop();
           if (token === null) {
        next({
          status: 401,
          msg: "token not provided",
        });
      } else {
        let data = jwt.verify(token, JWT_SECRET);
        if (data) {
          let auth_user = await user_svc.findUserById(data.user_id);
          if (auth_user) {
            req.auth_user = auth_user;
            next();
          } else {
            next({
              status: 404,
              msg: "user not found",
            });
          }
        } else {
          next({
            status: 403,
            msg: "access denied",
          });
        }
      }
    }
  } catch (error) {}
};

module.exports = auth;
