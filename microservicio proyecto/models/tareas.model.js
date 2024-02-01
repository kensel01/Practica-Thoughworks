class Tareas {
  constructor(
    id,
    sprint_id,
    epica_id,
    task_title,
    task_description,
    task_state,
    date_start,
    date_end
  ) {
    this.id = id;
    this.sprint_id = sprint_id;
    this.epica_id = epica_id;
    this.task_title = task_title;
    this.task_description = task_description;
    this.task_state = task_state;
    this.date_start = date_start;
    this.date_end = date_end;
  }
}
module.exports = Tareas;
