const Games = require("../models/Games");

exports.getAllGames = async (req, res) => {
  try {
    const games = await Games.find();
    res.status(200).json({
      data: games,
      success: true,
      message: `${req.method} = request to Games endpoint`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: `${req.method} = request to Games endpoint`,
      error
    })
  }
};

exports.getGameById = async (req, res) => {
  let game;
  try {
    const { id } = req.params;
    game = await Games.findById(id);
    res.status(200).json({
      data: game,
      success: true,
      message: `${req.method} = request to Games endpoint`,
    });
  } catch (error) {
    if (game === undefined || game === null) {
      res.status(404).json({
        success: false,
        message: `Game not found.`,
      })
    } else {
      res.status(500).json({
        success: false,
        message: `${req.method} = request to Games endpoint`,
        error
      })
    }
  }
};

exports.createGame = async (req, res) => {
  try {
    const { game } = req.body;
    const newGame = await Games.create(game);
    res.status(201).json({
      data: newGame,
      success: true,
      message: `${req.method} = request to Games endpoint`,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(422).json({
        success: false,
        message: `${req.method} = request to Games endpoint`,
        error
      })
    } else {
      res.status(500).json({
        success: false,
        message: `${req.method} = request to Games endpoint`,
        error
      })
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
      message: `${req.method} = request to Games endpoint`,
    });
  } catch (error) {
    if (game === undefined || game === null) {
      res.status(404).json({
        success: false,
        message: `Game not found.`,
      })
    } else {
      res.status(500).json({
        success: false,
        message: `${req.method} = request to Games endpoint`,
        error
      })
    }
  }
};

exports.deleteGame = async (req, res) => {
  let game;
  try {
    const { id } = req.params;
    game = await Games.findByIdAndDelete(id);
    games = await Games.find();
    res.status(200).json({
      data: games,
      success: true,
      message: `${req.method} = request to Games endpoint`,
    });
  } catch {
    if (game === undefined || game === null) {
      res.status(404).json({
        success: false,
        message: `Game not found.`,
      })
    } else {
      res.status(500).json({
        success: false,
        message: `${req.method} = request to Games endpoint`,
        error
      })
    }
  }
};
