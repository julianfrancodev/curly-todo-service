const Todo = require("../models/Todo");
const Project = require("../models/Project");
const { validationResult } = require('express-validator');


exports.createTodo = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extraer el pryecto y comprobar si existte

    const { project } = req.body;

    try {

        const projectD = await Project.findById(project);

        if(!projectD){
            return res.json({msg: "Proyecto no encontrado"});
        }

        // Revisar si el proyecto pertenece al usuario autenticado

        if (projectD.creator.toString() !== req.user.id) {
            return res.status(401).json({ msg: "No autorizado" });

        }

        // Creamos la tarea 

        const todo = new Todo(req.body);

        await todo.save();


        res.json({todo});



    } catch (e) {
        console.log(e);

        res.status(500).json({ msg: "Unexpected Error" });
    }

}
