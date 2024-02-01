const Sprint = require("../service sprint.service");

const getAllsprint = async (req, res, next) => {
  try {
    const allSprint = await Sprint.getAll();
    res.json(allSprint);
  } catch (error) {
    next(error);
  }
};
const getSprint = async (req, res, next) => {
  try {
    const id = req.params.id;
    const sprintbyid = await Sprint.getByid(id);
    if (!sprintbyid) {
      return res.status(404).json({ message: "Sprint no encontrada" });
    }
    res.json(sprintbyid);
  } catch (error) {
    next(error);
  }
};

const createSprint = async (req, res, next) => {
  try {
    const { name, duration, dateStart, dateEnd } = req.body;
    const newSprint = await Sprint.create(name, duration, dateStart, dateEnd);
    res.status(201).json(newSprint);
  } catch (error) {
    next(error);
  }
};

const updateSprint = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, duration, dateStart, dateEnd } = req.body;
    const updateSprint = await Sprint.update(
      id,
      name,
      duration,
      dateStart,
      dateEnd
    );
    if (!updateSprint) {
      return res.status(404).json({ message: "Sprint no encontrado" });
    }
    res.json(updateSprint);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllsprint,
  getSprint,
  createSprint,
  updateSprint,
};
