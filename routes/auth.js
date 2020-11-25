const express = require("express");
const router = express.Router();

//modulos intgermnos
const { Usuario } = require("../model/usuario");

//ruta
router.post("/", async (req, res) => {
  //validamos que exisa correo
  const usuario = await Usuario.findOne({ correo: req.body.correo });
  //si mo existe correo
  if (!usuario) return res.status(400).send("Correo o contraseña no válidos");
  if (usuario.pass !== req.body.pass) return res.status(400).send("orreo o contraseña no válidos")  
  //genera JWT
  const jwtToken = usuario.generateJWT();
  res.status(200).send({ jwtToken });
});

module.exports = router;
