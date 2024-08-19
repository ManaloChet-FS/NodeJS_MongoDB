const Studios = require("../models/Studios");
const Messages = require("../messages/messages");

exports.getAllStudios = async (req, res) => {
  try {
    const studios = await Studios.find()
      .select(
        "_id name yearEstablished country status games createdAt updatedAt"
      )
      .populate("games", "_id title");
    res.status(200).json({
      data: studios,
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

exports.getStudioById = async (req, res) => {
  let studio;
  try {
    const { id } = req.params;
    studio = await Studios.findById(id)
      .select(
        "_id name yearEstablished country status games createdAt updatedAt"
      )
      .populate("games", "_id title");
    res.status(200).json({
      data: studio,
      success: true,
      message: Messages.dataRetrieved,
    });
  } catch (error) {
    if (studio === undefined || studio === null) {
      res.status(404).json({
        success: false,
        message: Messages.studioNotFound,
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

exports.createStudio = async (req, res) => {
  try {
    const { studio } = req.body;
    const newStudio = await Studios.create(studio);
    res.status(201).json({
      data: newStudio,
      success: true,
      message: Messages.studioCreated,
    });
  } catch (error) {
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

exports.updateStudio = async (req, res) => {
  let studio;
  try {
    const { id } = req.params;
    studio = await Studios.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({
      data: studio,
      success: true,
      message: Messages.studioUpdated,
    });
  } catch (error) {
    if (studio === undefined || studio === null) {
      res.status(404).json({
        success: false,
        message: Messages.studioNotFound,
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

exports.deleteStudio = async (req, res) => {
  let studio;
  try {
    const { id } = req.params;
    studio = await Studios.findByIdAndDelete(id);
    studios = await Studios.find();
    res.status(200).json({
      data: studios,
      success: true,
      message: Messages.studioDeleted,
    });
  } catch {
    if (studio === undefined || studio === null) {
      res.status(404).json({
        success: false,
        message: Messages.studioNotFound,
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
