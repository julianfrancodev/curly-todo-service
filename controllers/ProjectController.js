const Project = require("../models/Project");
const { validationResult } = require('express-validator');

exports.createProject = async (req, res) => {

    // Revisar si hay errores

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        let project = new Project(req.body);

        // Guardar el credor via jwt

        project.creator = req.user.id;

        // Guardamos el proyecto

        project.save();

        res.json(project);


    } catch (error) {
        console.log(error);

        res.status(500).json({ msg: "Unexpected Error" });
    }
}

// Obtiene todos los proyectos del usuario actual


exports.getProjects = async (req, res) => {
    try {

        console.log(req.user);

        const projects = await Project.find({ creator: req.user.id })
            .sort({ createdAt: -1 });

        res.json({ projects });


    } catch (e) {
        console.log(e);

        res.status(500).json({ msg: "Unexpected Error" });
    }
}

// Actualizar un proyecto 

exports.updateProject = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extraer la informacion del proyeto

    const { name } = req.body;

    const newProject = {};

    if (name) {
        newProject.name = name;
    }

    try {

        // Revisar el id

        let project = await Project.findById(req.params.id);


        // Si el proyecto existe o no

        if (!project) {
            return res.status(404).json({ msg: "Proyecto no encontrado" });
        }


        // Verificar el credor del proyecto 

        if (project.creator.toString() !== req.user.id) {
            return res.status(401).json({ msg: "No autorizado" });

        }

        // Actualizar

        project = await Project.findOneAndUpdate({ _id: req.params.id }, { $set: newProject }, { new: true });

        res.json({ project });

    } catch (e) {
        console.log(e);

        res.status(500).json({ msg: "Unexpected Error" });
    }

}


// Elimina un proyecto por su id


exports.deleteProject = async (req, res) => {
    try {
        // Revisar el id

        let project = await Project.findById(req.params.id);


        // Si el proyecto existe o no

        if (!project) {
            return res.status(404).json({ msg: "Proyecto no encontrado" });
        }


        // Verificar el credor del proyecto 

        if (project.creator.toString() !== req.user.id) {
            return res.status(401).json({ msg: "No autorizado" });

        }

        // Eliminar el proyecto

        await Project.findOneAndRemove({_id: req.params.id});

        res.json({msg: "Proyecto Eliminado"})
    } catch (e) {
        console.log(e);
        res.status(500).json({ msg: "Unexpected Error" });

    }
}