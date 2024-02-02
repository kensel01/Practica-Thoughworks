const Sprint = require("../models/sprint.model");
const SprintService = require("../service/sprint.service");

const SprintController = {
  getAllsprint: async (req, res, next) => {
    try {
      const sprintData = await SprintService.getAll();
      const sprints = sprintData.map(
        (pd) =>
          new Sprint(pd.id, pd.name, pd.duration, pd.dateStart, pd.dateEnd)
      );
      res.json(sprints);
    } catch (error) {
      next(error);
    }
  },

  getSprint: async (req, res, next) => {
    try {
      const sprintData = await SprintService.getById(req.params.id);
      if (!sprintData) {
        return res.status(404).json({ message: "Sprint  no encontrado" });
      }
      const sprint = new Sprint(
        sprintData.id,
        sprintData.name,
        sprintData.duration,
        sprintData.dateStart,
        sprintData.dateEnd
      );
      res.json(sprint);
    } catch (error) {
      next(error);
    }
  },
  createSprint: async (req, res, next) => {
    try {
      const { name, duration, dateStart, dateEnd } = req.body;
      const sprintData = await SprintService.createSprint(
        name,
        duration,
        dateStart,
        dateEnd
      );
      const newSprint = new Sprint(
        sprintData.name,
        sprintData.duration,
        sprintData.dateStart,
        sprintData.dateEnd
      );
      res.status(201).json(newSprint);
    } catch (error) {
      next(error);
    }
  },
  updateSprint: async (req, res, next) => {
    try {
      const { name, duration, dateStart, dateEnd } = req.body;
      const sprintData = await SprintService.updateSprint(
        req.params.id,
        name,
        duration,
        dateStart,
        dateEnd
      );
      if (!sprintData) {
        return res.status(404).json({ message: "Sprint no encontrado." });
      }
      const updatesprint = new Sprint(
        sprintData.id,
        sprintData.name,
        sprintData.duration,
        sprintData.dateStart,
        sprintData.dateEnd
      );
      res.json(updatesprint);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = SprintController;
