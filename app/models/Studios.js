const mongoose = require("mongoose");

const studiosSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Studio name is required."],
      maxLength: [50, "Studio name cannot exceed more than 50 characters."],
    },
    yearEstablished: {
      type: Number,
      required: [true, "Year established is required."],
      max: [new Date().getFullYear(), "Year cannot be in the future."],
      match: [/^\d{4}$/, "Enter a valid year."],
    },
    country: {
      type: String,
      maxLength: [50, "Country cannot exceed more than 50 characters."],
    },
    status: {
      type: String,
      required: [true, "Studio status is required."],
      enum: ["Active", "Closed", "Merged"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Studio", studiosSchema);
