const mongoose = require("mongoose");

const positionSchema = new mongoose.Schema(
  {
    role: { type: String, required: true }, // Governors, Joint Secretaries, Heads
    members: { type: [String], required: true }, // Array of names
  },
  { _id: false }
);

const leadershipSchema = new mongoose.Schema(
  {
    year: { type: String, required: true }, // Academic Year
    data: { type: [positionSchema], required: true },
  },
  { _id: false }
);

const teamSchema = new mongoose.Schema({
  currentLeadership: leadershipSchema, // Current Leadership
  pastLeadership: [leadershipSchema], // Array of past leaderships
});

module.exports = mongoose.model("Team", teamSchema);

// const mongoose = require("mongoose");

// const leadershipSchema = new mongoose.Schema(
//   {
//     year: String,
//     data: [{ 
//       name: [Array],
//       role: String
//      }],
//   },
//   { _id: false }
// );
// const teamSchema = new mongoose.Schema({
//   currentLeadership: leadershipSchema,
//   pastLeadership: [leadershipSchema],
// });
// module.exports = mongoose.model("Team", teamSchema);