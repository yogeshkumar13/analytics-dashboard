const express = require("express");
const router = express.Router();

const { trackClick, getAnalytics,getLineData  } = require("../controllers/analyticsController");
const verifyToken = require("../middleware/authMiddleware");

router.post("/track", verifyToken, trackClick);
router.get("/", getAnalytics);
router.get("/line", getLineData);
module.exports = router;