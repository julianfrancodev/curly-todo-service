const express = require("express");
const TodoController = require('../controllers/TodoController');
const Auth = require('../middleware/Auth');
const { check } = require('express-validator');



const router = express.Router();
// Crear tarea 
// /api/todos


router.post('/',
    Auth,
    [
        check('name', "Nombre es obligatorio").not().isEmpty(),
        check('project', "Proyecto es obligatorio").not().isEmpty()
    ],
    TodoController.createTodo
);

module.exports = router;