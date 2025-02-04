const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: Date, required: true },
  lessonType: { type: String, enum: ["Beginner", "Advanced"], required: true },
  notes: { type: String },
});

module.exports = mongoose.model("Reservation", reservationSchema);








// const mongoose = require("mongoose");

// const reservationSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   date: { type: Date, required: true },
//   timeSlot: {
//     type: String,
//     required: true,
//     enum: [
//       "08:00 - 09:00",
//       "09:00 - 10:00",
//       "10:00 - 11:00",
//       "11:00 - 12:00",
//       "13:00 - 14:00",
//       "14:00 - 15:00",
//       "15:00 - 16:00",
//       "16:00 - 17:00",
//     ],
//   },
//   status: {
//     type: String,
//     enum: ["pending", "confirmed", "cancelled"],
//     default: "pending",
//   },
// });

// module.exports = mongoose.model("Reservation", reservationSchema);

