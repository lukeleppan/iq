const router = require("express").Router();

router.use("/users", require("./users"));
router.use("/admin", require("./admin"));
router.use("/", require("./general"));

module.exports = router;
