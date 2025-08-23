const Team = require("../models/Team");

/**
 * Get the single team document
 */
exports.getTeamData = async (req, res) => {
  try {
    const team = await Team.findOne();

    if (!team) {
      return res.status(404).json({ message: "No team document found" });
    }

    res.json(team);
  } catch (error) {
    console.error("Error fetching team data:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Update the team document (current + past leadership)
 */
exports.updateTeamData = async (req, res) => {
  try {
    let team = await Team.findOne();

    // If no document exists, create one
    if (!team) {
      team = new Team({
        currentLeadership: req.body.currentLeadership || {},
        pastLeadership: req.body.pastLeadership || [],
      });
    } else {
      // If document exists → update fields
      if (req.body.currentLeadership) {
        team.currentLeadership = req.body.currentLeadership;
      }
      if (req.body.pastLeadership) {
        team.pastLeadership = req.body.pastLeadership;
      }
    }

    const savedTeam = await team.save();
    res.json(savedTeam);
  } catch (error) {
    console.error("Error updating team data:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// const Team = require("../models/Team");

// /**
//  * Fetch all team data
//  */
// exports.getTeamData = async (req, res) => {
//   try {
//     const team = await Team.findOne(); // only one doc needed
//     if (!team) {
//       return res.status(404).json({ message: "No team data found" });
//     }
//     res.json(team);
//   } catch (error) {
//     console.error("Error fetching team data:", error.message);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// /**
//  * Update current leadership
//  * - Archives old current leadership into pastLeadership
//  * - Replaces with new year + data
//  */
// exports.updateCurrentLeadership = async (req, res) => {
//   try {
//     const { year, data } = req.body;

//     if (!year || !data) {
//       return res.status(400).json({ message: "Year and data are required" });
//     }

//     // Get the single team document (or create one if missing)
//     let team = await Team.findOne();

//     if (!team) {
//       // first time creation
//       team = new Team({
//         currentLeadership: { year, data },
//         pastLeadership: []
//       });
//     } else {
//       // if a current leadership exists, archive it
//       if (team.currentLeadership && team.currentLeadership.year) {
//         team.pastLeadership.push(team.currentLeadership);
//       }
//       // update current leadership
//       team.currentLeadership = { year, data };
//     }

//     await team.save();
//     res.json({ message: "Current leadership updated successfully", team });
//   } catch (error) {
//     console.error("Error updating current leadership:", error.message);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// /**
//  * Remove a leadership entry from pastLeadership (by year)
//  */
// exports.deletePastLeadership = async (req, res) => {
//   try {
//     const { year } = req.params;

//     const team = await Team.findOne();
//     if (!team) {
//       return res.status(404).json({ message: "No team data found" });
//     }

//     team.pastLeadership = team.pastLeadership.filter(
//       (entry) => entry.year !== year
//     );

//     await team.save();
//     res.json({ message: "Past leadership removed", team });
//   } catch (error) {
//     console.error("Error deleting past leadership:", error.message);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };
// // const Team = require("../models/Team");
// // Fetch team data
// exports.getTeamData = async (req, res) => {
//   try {
//     const team = await Team.findOne(); // only one doc for all data
//     if (!team) {
//       return res.status(404).json({ message: "No team data found" });
//     }
//     res.status(200).json(team);
//   } catch (err) {
//     console.error("Error fetching team data:", err.message);
//     res.status(500).json({ error: "Failed to fetch team data" });
//   }
// };

// // Update current leadership without archiving
// exports.updateCurrentLeadership = async (req, res) => {
//   try {
//     const { year, data } = req.body;

//     let team = await Team.findOne();
//     if (!team) {
//       // Create doc if not exists
//       team = new Team({
//         currentLeadership: { year, data },
//         pastLeadership: []
//       });
//     } else {
//       team.currentLeadership = { year, data };
//     }

//     await team.save();
//     res.status(200).json({ message: "Current leadership updated", team });
//   } catch (err) {
//     console.error("Error updating current leadership:", err.message);
//     res.status(500).json({ error: "Failed to update current leadership" });
//   }
// };

// // Archive current leadership & set new
// exports.archiveAndUpdateLeadership = async (req, res) => {
//   try {
//     const { year, data } = req.body;

//     let team = await Team.findOne();
//     if (!team) {
//       team = new Team({
//         currentLeadership: { year, data },
//         pastLeadership: []
//       });
//     } else {
//       if (team.currentLeadership.year) {
//         // push current to past
//         team.pastLeadership.unshift(team.currentLeadership);
//       }
//       team.currentLeadership = { year, data };
//     }

//     await team.save();
//     res.status(200).json({ message: "Leadership updated with archive", team });
//   } catch (err) {
//     console.error("Error archiving and updating leadership:", err.message);
//     res.status(500).json({ error: "Failed to archive and update leadership" });
//   }
// };
// const Team = require("../models/Team");

// /**
//  * Fetch team data
//  */
// exports.getTeamData = async (req, res) => {
//   try {
//     const team = await Team.findOne(); // always 1 document
//     if (!team) {
//       return res.status(404).json({ message: "No team data found" });
//     }
//     res.json(team);
//   } catch (err) {
//     console.error("Error fetching team data:", err.message);
//     res.status(500).json({ error: "Failed to fetch team data" });
//   }
// };

// /**
//  * Update current leadership (without archiving)
//  */
// // // controllers/teamController.js

// exports.updateCurrentLeadership = async (req, res) => {
//   try {
//     const { year, data } = req.body;

//     // Always work with the single Team document
//     let team = await Team.findOne();

//     // If no team document exists, create one
//     if (!team) {
//       team = new Team({
//         currentLeadership: { year, data },
//         pastLeadership: []
//       });
//     } else {
//       // If there is already currentLeadership, push it to past
//       if (team.currentLeadership && team.currentLeadership.year) {
//         team.pastLeadership.push(team.currentLeadership);
//       }

//       // Set new current leadership
//       team.currentLeadership = { year, data };
//     }

//     await team.save();

//     res.json({ message: "Current leadership updated successfully", team });
//   } catch (error) {
//     console.error("Error updating current leadership:", error.message);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// /**
//  * Archive old leadership and update new
//  */
// exports.archiveAndUpdateLeadership = async (req, res) => {
//   try {
//     const { year, data } = req.body;

//     let team = await Team.findOne();
//     if (!team) {
//       team = new Team({
//         currentLeadership: { year, data },
//         pastLeadership: [],
//       });
//     } else {
//       // Push current into past before updating
//       if (team.currentLeadership && team.currentLeadership.year) {
//         team.pastLeadership.unshift(team.currentLeadership);
//       }
//       team.currentLeadership = { year, data };
//     }

//     await team.save();
//     res.status(200).json({ message: "Leadership archived & updated", team });
//   } catch (err) {
//     console.error("Error archiving and updating leadership:", err.message);
//     res.status(500).json({ error: "Failed to archive and update leadership" });
//   }
// };
