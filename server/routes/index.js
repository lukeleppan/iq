const router = require("express").Router();

// router.use("/api/users", require("./users"));
router.use("/api/admin", require("./admin"));
router.use("/api", require("./general"));

module.exports = router;
