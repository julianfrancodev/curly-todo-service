// Rutas para autenticar usuarios

const express = require('express');
const { check } = require("express-validator");

const AuthController = require('../controllers/AuthController');


const router = express.Router();

// Autenticar usuarios
// api/users

router.post('/',
  [
    check("email", 'Agrega un email valido ').isEmail(),
    check('password','El password deber se minimo 6 caracateres').isLength({min: 6})
  ],
  AuthController.authUser
);

module.exports = router;
