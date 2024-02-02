const EpicaService = require("../service/epica.service");
const Epica = require("../models/epica.model");

const EpicController = {
  getAllepic: async (req, res, next) => {
    try {
      const epicData = await EpicaService.getAll();
      const epicas = epicData.map(
        (pd) => new Epica(pd.id, pd.title, pd.description)
      );
      res.json(epicas);
    } catch (error) {
      next(error);
    }
  },
  getEpic: async (req, res, next) => {
    try {
      const epicData = await EpicaService.getById(req.params.id);
      if (!epicData) {
        return res.status(404).json({ message: "Epica no encontrada" });
      }
      const epica = new Epica(
        epicData.id,
        epicData.title,
        epicData.description
      );
      res.json(epica);
    } catch (error) {
      next(error);
    }
  },
  createEpic: async (req, res, next) => {
    try {
      const { title, description } = req.body;
      const epicData = await EpicaService.createEpic(title, description);
      const newepic = new Epica(epicData.title, epicData.description);
      res.status(201).json(newepic);
    } catch (error) {
      next(error);
    }
  },
  updateEpic: async (req, res, next) => {
    try {
      const { title, description } = req.body;
      const epicData = await EpicaService.updateEpic(
        req.params.id,
        title,
        description
      );
      if (!epicData) {
        return res.status(404).json({ message: "Epcia no encontrada" });
      }
      const updateepic = new Epica(
        epicData.id,
        epicData.title,
        epicData.description
      );
      res.json(updateepic);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = EpicController;
