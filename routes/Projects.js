const express = require("express");
const ProjectController = require('../controllers/ProjectController');
const Auth = require('../middleware/Auth');
const { check } = require('express-validator');



const router = express.Router();

// Persist Projects
// api/projects
router.post('/',
    Auth,
    [
        check("name", "El nombre el proyecto es obligatorio").not().isEmpty()
    ],
    ProjectController.createProject);

router.get('/',
    Auth,
    ProjectController.getProjects);

router.put('/:id',
    Auth,
    [
        check("name", "El nombre el proyecto es obligatorio").not().isEmpty()
    ],
    ProjectController.updateProject);
router.delete('/:id',
    Auth,
    ProjectController.deleteProject);


module.exports = router;