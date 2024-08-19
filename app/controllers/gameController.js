const Games = require("../models/Games");
const Studios = require("../models/Studios");
const Messages = require("../messages/messages");

exports.getAllGames = async (req, res) => {
  try {
    const games = await Games.find()
      .select(
        "_id title releaseDate genre averageScore studio createdAt updatedAt"
      )
      .populate("studio", "_id name");
    res.status(200).json({
      data: games,
      success: true,
      message: Messages.dataRetrieved,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: Messages.serverError,
      error,
    });
  }
};

exports.getGameById = async (req, res) => {
  let game;
  try {
    const { id } = req.params;
    game = await Games.findById(id)
      .select(
        "_id title releaseDate genre averageScore studio createdAt updatedAt"
      )
      .populate("studio", "_id name");
    res.status(200).json({
      data: game,
      success: true,
      message: Messages.dataRetrieved,
    });
  } catch (error) {
    if (game === undefined || game === null) {
      res.status(404).json({
        success: false,
        message: Messages.gameNotFound,
      });
    } else {
      res.status(500).json({
        success: false,
        message: Messages.serverError,
        error,
      });
    }
  }
};

exports.createGame = async (req, res) => {
  try {
    const { game } = req.body;
    const newGame = await Games.create(game);
    // Get current list of games by studio
    const { games } = await Studios.findById(newGame.studio);
    // Finds the studio by ID and updates its game list with new game ID
    await Studios.findByIdAndUpdate(newGame.studio, {
      games: [...games, newGame._id],
    });
    res.status(201).json({
      data: newGame,
      success: true,
      message: Messages.gameCreated,
    });
  } catch (error) {
    console.log(error);
    if (error.name === "ValidationError") {
      res.status(422).json({
        success: false,
        message: Messages.validationError,
        error,
      });
    } else {
      res.status(500).json({
        success: false,
        message: Messages.serverError,
        error,
      });
    }
  }
};

exports.updateGame = async (req, res) => {
  let game;
  try {
    const { id } = req.params;
    game = await Games.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({
      data: game,
      success: true,
      message: Messages.gameUpdated,
    });
  } catch (error) {
    if (game === undefined || game === null) {
      res.status(404).json({
        success: false,
        message: Messages.gameNotFound,
      });
    } else {
      res.status(500).json({
        success: false,
        message: Messages.serverError,
        error,
      });
    }
  }
};

exports.deleteGame = async (req, res) => {
  let game;
  try {
    const { id } = req.params;
    // Grabs studioId, the studios game list, and the game id as an object
    const { studio: studioId } = await Games.findById(id);
    const { games: studioGames } = await Studios.findById(studioId);
    const { _id: gameId } = await Games.findById(id);

    // Creates a new studio game list utilizing filter. The id objects have to be converted to strings to actually compare their values.
    const newStudioGames = studioGames.filter(studioGame => studioGame.toString() !== gameId.toString());

    // Updates the studio's game list
    await Studios.findByIdAndUpdate(studioId, { games: newStudioGames });

    // Deletes the game
    game = await Games.findByIdAndDelete(id);
  
    games = await Games.find();

    res.status(200).json({
      data: games,
      success: true,
      message: Messages.gameDeleted,
    });
  } catch (error) {
    console.log(error);
    if (game === undefined || game === null) {
      res.status(404).json({
        success: false,
        message: Messages.gameNotFound,
      });
    } else {
      res.status(500).json({
        success: false,
        message: Messages.serverError,
        error,
      });
    }
  }
};
