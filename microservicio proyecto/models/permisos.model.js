class Permisos {
    constructor( id ,edit_epica ,edit_task ,edit_project, rol ) {
        this.id= id;
        this.edit_epica= edit_epica;
        this.edit_task= edit_task;
        this.edit_project = edit_project;
        this.rol= rol;
    }
}

module.exports = Permisos;