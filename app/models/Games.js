const mongoose = require("mongoose");

const gamesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Game title is required."],
      unique: [true, "Game already exists in DB."],
      trim: true,
      maxLength: [50, "Game title cannot exceed 50 characters."],
    },
    releaseDate: {
      type: Date,
      required: [true, "Release date is required."],
    },
    genre: {
      type: [String],
      required: [true, "Please specify the game's genre"],
      // Can only include genre's in the list below
      enum: [
        "Shooter",
        "Platformer",
        "Racing",
        "RPG",
        "Simulator",
        "Sport",
        "Strategy",
        "MOBA",
        "MMO",
        "Stealth"
      ],
    },
    averageScore: {
      type: Number,
      min: [0, "Rating cannot be lower than 0."],
      max: [10, "Rating cannot be more than 10"],
    },
    studio: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Studio",
      required: [true, "Game studio is required."]
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Game", gamesSchema);
