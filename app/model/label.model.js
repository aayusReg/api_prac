const mongoose = require("mongoose");
const common_schema = require("./common_schema");
const LabelSchemaDef = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["brand", "banner"],
      default: "banner",
    },
    status: common_schema.status,
    create_by: common_schema.created_by,
  },
  common_schema.trigger
);

const LabelModel = mongoose.model("Label", LabelSchemaDef);

module.exports = LabelModel;
