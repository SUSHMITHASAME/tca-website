const express = require("express");
const router = express.Router();
const { getTeamData, updateTeamData } = require("../controllers/teamController");

// GET team
router.get("/", getTeamData);

// PUT team
router.put("/", updateTeamData);
module.exports = router;

