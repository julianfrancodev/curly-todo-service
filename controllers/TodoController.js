const Todo = require("../models/Todo");
const Project = require("../models/Project");
const { validationResult } = require('express-validator');


exports.createTodo = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extraer el pryecto y comprobar si existte


    try {
        const { project } = req.body;

        const projectD = await Project.findById(project);

        if (!projectD) {
            return res.json({ msg: "Proyecto no encontrado" });
        }

        // Revisar si el proyecto pertenece al usuario autenticado

        if (projectD.creator.toString() !== req.user.id) {
            return res.status(401).json({ msg: "No autorizado" });

        }

        // Creamos la tarea 

        const todo = new Todo(req.body);

        await todo.save();


        res.json({ todo });



    } catch (e) {
        console.log(e);

        res.status(500).json({ msg: "Unexpected Error" });
    }

}


// Obtiene las tareas por proyecto

exports.getTodos = async (req, res) => {

    try {

        const { project } = req.query;


        const projectD = await Project.findById(project);

        if (!projectD) {
            return res.json({ msg: "Proyecto no encontrado" });
        }

        // Revisar si el proyecto pertenece al usuario autenticado

        if (projectD.creator.toString() !== req.user.id) {
            return res.status(401).json({ msg: "No autorizado" });

        }

        //Obtener las tareas por proyecto

        const todos = await Todo.find({ project: project }).sort({ createdAt: -1 });

        res.json({ todos });

    } catch (e) {
        console.log(e);
        res.status(500).json({ msg: "Unexpected Error" });

    }

}


exports.updateTodo = async (req, res) => {
    try {

        const { project, name, state } = req.body;



        // Revisar si la tarea existe
        let todoD = await Todo.findById(req.params.id);

        if (!todoD) {
            return res.status(404).json({ msg: "No existe la tarea" });
        }

        // Extraer el proyecto 
        const projectD = await Project.findById(project);

        // Revisar si el proyecto pertenece al usuario autenticado

        if (projectD.creator.toString() !== req.user.id) {
            return res.status(401).json({ msg: "No autorizado" });

        }

        // Crear un nuevo proyecto con nueva informacion

        const newTodo = {};

        newTodo.name = name;
        newTodo.state = state;

        // Guardar la tarea 

        todoD = await Todo.findOneAndUpdate({ _id: req.params.id }, newTodo, { new: true });

        res.json({ todo: todoD });


    } catch (e) {
        console.log(e);
        res.status(500).json({ msg: "Unexpected Error" });
    }
}


exports.deleteTodo = async (req, res) => {
    try {

        const { project } = req.query;



        // Revisar si la tarea existe
        let todoD = await Todo.findById(req.params.id);

        if (!todoD) {
            return res.status(404).json({ msg: "No existe la tarea" });
        }

        // Extraer el proyecto 
        const projectD = await Project.findById(project);

        // Revisar si el proyecto pertenece al usuario autenticado

        if (projectD.creator.toString() !== req.user.id) {
            return res.status(401).json({ msg: "No autorizado" });

        }

        //Eliminar


        await Todo.findOneAndRemove({ _id: req.params.id });

        res.json({ msg: "Tarea eliminada" });


    } catch (e) {
        console.log(e);
        res.status(500).json({ msg: "Unexpected Error" });
    }
}