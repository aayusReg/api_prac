const router = require("express").Router();

const auth_routes = require("./auth.routes");
const label_routes = require("./label.routes");
router.use(auth_routes);
router.use(label_routes);

module.exports = router;
