const jwt = require("jsonwebtoken");

//crear funcion middleware

function auth(req, res, next){
    let jwtToken = req.header("Authorization");
    jwtToken = jwtToken.split(" ")[1];
    if(!jwtToken) return res.status(401).send("No hay token");

    try{ 
        const payload = jwt.verify(jwtToken, "clave");
        req.usuario = payload;
        next();
    } catch (error){
        res.status(401).send("Token no válido")
    }
}  

module.exports = auth;