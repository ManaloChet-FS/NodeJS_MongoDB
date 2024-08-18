const Studios = require("../models/Studios");

exports.getAllStudios = async (req, res) => {
  try {
    const studios = await Studios.find();
    res.status(200).json({
      data: studios,
      success: true,
      message: `${req.method} = request to Studios endpoint`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: `${req.method} = request to Studios endpoint`,
      error
    })
  }
};

exports.getStudioById = async (req, res) => {
  let studio;
  try {
    const { id } = req.params;
    studio = await Studios.findById(id);
    res.status(200).json({
      data: studio,
      success: true,
      message: `${req.method} = request to Studios endpoint`,
    });
  } catch (error) {
    if (studio === undefined || studio === null) {
      res.status(404).json({
        success: false,
        message: `Studio not found.`,
      })
    } else {
      res.status(500).json({
        success: false,
        message: `${req.method} = request to Studios endpoint`,
        error
      })
    }
  }
};

exports.createStudio = async (req, res) => {
  try {
    const { studio } = req.body;
    const newStudio = await Studios.create(studio);
    res.status(201).json({
      data: newStudio,
      success: true,
      message: `${req.method} = request to Studios endpoint`,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(422).json({
        success: false,
        message: `${req.method} = request to Studios endpoint`,
        error
      })
    } else {
      res.status(500).json({
        success: false,
        message: `${req.method} = request to Studios endpoint`,
        error
      })
    }
  }
};

exports.updateStudio = async (req, res) => {
  let studio;
  try {
    const { id } = req.params;
    studio = await Studios.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({
      data: studio,
      success: true,
      message: `${req.method} = request to Studios endpoint`,
    });
  } catch (error) {
    if (studio === undefined || studio === null) {
      res.status(404).json({
        success: false,
        message: `Studio not found.`,
      })
    } else {
      res.status(500).json({
        success: false,
        message: `${req.method} = request to Studios endpoint`,
        error
      })
    }
  }
};

exports.deleteStudio = async (req, res) => {
  let studio;
  try {
    const { id } = req.params;
    studio = await Studios.findByIdAndDelete(id);
    studios = await Studios.find();
    res.status(200).json({
      data: studios,
      success: true,
      message: `${req.method} = request to Studios endpoint`,
    });
  } catch {
    if (studio === undefined || studio === null) {
      res.status(404).json({
        success: false,
        message: `Studio not found.`,
      })
    } else {
      res.status(500).json({
        success: false,
        message: `${req.method} = request to Studios endpoint`,
        error
      })
    }
  }
};
