const Epica = require("../service/epica.service");

const getAllepic = async (req, res, next) => {
  try {
    const allEpic = await Epica.getAll;
    res.json(allEpic);
  } catch (error) {
    next(error);
  }
};
const getEpic = async (req, res, next) => {
  try {
    const id = req.params.id;
    const epicbyid = await Epica.getByid(id);
    if (!epicbyid) {
      return res.status(404).json({ message: "Epica no encontrada" });
    }
    res.json(epicbyid);
  } catch (error) {
    next(error);
  }
};

const createEpic = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const newEpic = await Epica.create(title, description);
    res.status(201).json(newEpic);
  } catch (error) {
    next(error);
  }
};

const updateEpic = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { title, description } = req.body;
    const updateEpic = await Epica.update(id, title, description);
    if (!updateEpic) {
      return res.status(404).json({ message: "Epcia no encontrada" });
    }
    res.json(updateEpic);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllepic,
  getEpic,
  createEpic,
  updateEpic,
};
