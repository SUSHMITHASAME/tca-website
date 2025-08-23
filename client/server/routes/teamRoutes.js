const express = require("express");
const router = express.Router();
const { getTeamData, updateTeamData } = require("../controllers/teamController");

// GET team
router.get("/", getTeamData);

// PUT team
router.put("/", updateTeamData);

module.exports = router;

// const express = require("express");
// const { getTeamData, updateCurrentLeadership, deletePastLeadership } = require("../controllers/teamController");
// const router = express.Router();

// router.get("/", getTeamData);
// router.put("/update-current", updateCurrentLeadership);
// router.delete("/past/:year", deletePastLeadership);

// module.exports = router;

// // const express = require("express");
// // const router = express.Router();
// // const {
// //   getTeamData,
// //   updateCurrentLeadership,
// //   archiveAndUpdateLeadership
// // } = require("../controllers/teamController");

// // router.get("/", getTeamData);
// // router.put("/update-current", updateCurrentLeadership);
// // router.put("/archive-and-update", archiveAndUpdateLeadership);

// // module.exports = router;

