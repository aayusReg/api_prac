const Joi = require("joi");
const UserModel = require("../model/auth.model");

class UserService {
  validateUser = (data) => {
    try {
      let userSchema = Joi.object({
        name: Joi.string().required(),
        address: Joi.string().required(),
        password: Joi.string().required(),
        email: Joi.string().email().required(),
        role: Joi.string()
          .valid("seller", "customer", "admin")
          .default("customer"),
        image: Joi.string(),
        status: Joi.string().valid("active", "inactive"),
      });
      let response = userSchema.validate(data);
      if (response.error) {
        throw response.error.details[0].message;
      } else {
        this.data = data;
      }
    } catch (error) {
      console.log("Validation error: ", error);
      throw error;
    }
  };
  registerUser = async () => {
    try {
      let user_obj = new UserModel(this.data);
      return await user_obj.save();
    } catch (error) {
      throw error;
    }
  };
  loginUser = async (data) => {
    return await UserModel.findOne({
      email: data.email,
    });
  };
}

module.exports = UserService;
