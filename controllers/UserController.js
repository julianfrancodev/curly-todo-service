const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");

const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {

  // Revisar si hay errores

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Extraer email y password 

  const { email, password } = req.body;
  try {

    // Revisar que el usuario registrado sea unico 

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "El usuario ya existe" });
    }

    //Guardar el nuevo usuario

    user = new User(req.body);

    //Hashear el password

    const salt = await bcryptjs.genSalt(10);

    user.password = await bcryptjs.hash(password, salt);

    // Guardar Usuario
    await user.save();

    // Crear y firmar el jwt 

    const payload = {
      user:{
        id: user.id
      }
    };

    // firmar el jwt

    jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: 10000000

    }, (error, token) => {
      if (error) throw error;

      res.json({ token: token });

    });

  } catch (error) {
    console.log(error);
    res.status(400).json({ mag: "Hubo un error" });
  }

}
