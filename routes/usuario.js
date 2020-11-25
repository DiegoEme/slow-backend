const express = require("express");
const router = express.Router();

const { Usuario } = require("../model/usuario");

//Ruta
router.post("/", async (req, res) => {
  //Revisamos si existe el mismo correo en DB
  let usuario = await Usuario.findOne({ correo: req.body.correo });
  //si el usuario existe en BD
  if (usuario) return res.status(400).send("El usuario ya está registrado");
  //si correo no exsite
  usuario = new Usuario({
    nombre: req.body.nombre,
    correo: req.body.correo,
    pass: req.body.pass,
  });
  //guardar usuario en BD y generamps JWT
  const result = await usuario.save();
  const jwtToken = usuario.generateJWT();
  res.status(200).send({ jwtToken });
});

module.exports = router;