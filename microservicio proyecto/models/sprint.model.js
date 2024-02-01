class Sprint {
  constructor(id, project_id, name, duration, date_start, date_end) {
    this.id = id;
    this.project_id = project_id;
    this.name = name;
    this.duration = duration;
    this.date_start = date_start;
    this.date_end = date_end;
  }
}
module.exports = Sprint;
