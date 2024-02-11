const mongoose = require("mongoose");
const common_schema = require("./common_schema");
const UserSchemaDef = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    role: {
      type: String,
      enum: ["seller", "customer", "admin"],
      default: "customer",
    },
    status: common_schema.status,
    create_by: common_schema.created_by,
  },
  common_schema.trigger
);

const UserModel = mongoose.model("User", UserSchemaDef);

module.exports = UserModel;
