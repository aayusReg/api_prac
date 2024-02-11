const LabelController = require("../app/controller/label.controller");
const auth = require("../app/middleware/auth.middleware");
const isAdmin = require("../app/middleware/rbac.middleware");
const uploader = require("../app/middleware/uploader.middleware");

const router = require("express").Router();
const label_ctrl = new LabelController();
const validateType = (req, res, next) => {
  if (req.params.type === "banner" || req.params.type === "brand") {
    next();
  } else {
    next({
      status: 404,
      msg: "resource not found",
    });
  }
};

router.route("/:type")
  .post(
    validateType,
    auth,
    isAdmin,
    uploader.single("image"),
    label_ctrl.registerLabel
  )
  .get(validateType,label_ctrl.getAllLabel)
module.exports = router;
