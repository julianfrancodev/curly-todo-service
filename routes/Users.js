// Rutas para crear usuarios

const express = require('express');
const UserController = require('../controllers/UserController');
const { check } = require("express-validator");



const router = express.Router();

// Crear un usuarios
// api/users

router.post('/',
  [
    check('name','El nombre es obligatorio').not().isEmpty(),
    check("email", 'Agrega un email valido ').isEmail(),
    check('password','El password deber se minimo 6 caracateres').isLength({min: 6})
  ],
  UserController.createUser
);

module.exports = router;
