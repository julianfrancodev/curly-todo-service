const jwt = require("jsonwebtoken");


module.exports = function (req, res, next) {
    //Leer el token del Header

    const token = req.header("x-auth-token");

    // Revisar si no hay token

    console.log(token);
    
    if (!token) {
        return res.status(401).json({ msg: "No token in x-auth-token" });
    }

    try {

        // Validar el token

        const cipher = jwt.verify(token, process.env.SECRET_KEY);

        req.user = cipher.user;

        next();
    } catch (e) {
        console.log(e);
        res.status(401).json({ msg: "Invalid Token" });
    }

}
