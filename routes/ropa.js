//modulos de node
const express = require("express");
const router = express.Router();

//modulos internos

const { Ropa } = require("../model/ropa");
const { Usuario } = require("../model/usuario");
const Catalogo = require("../model/catalogo");
const auth = require("../middleware/auth");
const cargarArchivo = require("../middleware/file");

//CREATE ropa
router.post("/", auth, async (req, res) => {
  const usuario = await Usuario.findById(req.usuario._id);
  //si usuario no existe
  if (!usuario) return res.status(400).send("El usuario no existe");
  //si usuario existe
  const ropa = new Ropa({
    idUsuario: usuario._id,
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
  });
  //enviamos resultado
  const result = await ropa.save();
  res.status(200).send(result);
});

//CREATE ropa con imagen
router.post("/cargarArchivo", cargarArchivo.single("sticker"), auth, async(req, res) => {
    //protocolo https o con el local o dominio
    const url = req.protocol + "://" + req.get("host");
    //verificamos si existe usuario
    const usuario = await Usuario.findById(req.usuario._id);
    if(!usuario) return res.status(401).send("No existe usuario");
    //definimos ruta de la imagen
    let rutaImagen = null;
    if(req.file.filename){
        rutaImagen = url + "/public/" + req.file.filename;
    } else {
        rutaImagen = null;
    }
    //guardar en ropa
    const ropa = new Ropa({
    idUsuario: usuario._id,
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    sticker: rutaImagen,
    })
    const result = await ropa.save();
    res.status(200).send(result);
})

//READ ropa
//quedaria 3000/ropa/lista
router.get("/lista", auth, async (req, res) => {
  //buscamos el usuario logueado
  const usuario = await Usuario.findById(req.usuario._id);
  //si usuario no nexiste
  if (!usuario) return res.status(401).send("Usuario no existe");
  //si usuario existe
  const ropa = await Ropa.find({ idUsuario: req.usuario._id });
  res.send(ropa);
});

//UPDATE ropa
router.put("/", auth, async (req, res) => {
  //buscamos el usuario
  const usuario = await Usuario.findById(req.usuario._id);
  //si usuario no existe
  if (!usuario) return res.status(401).send("Usuario no existe");
  //hacemos UPDATE
  const ropa = await Ropa.findByIdAndUpdate(
    req.body._id,
    {
      idUsuario: usuario._id,
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
    },
    {
      new: true,
    }
  );
  //si no hay actividades para el usuario
  if(!ropa) return res.status(401).send("No hay Ropa");
  //si se hizo update a ropa
  res.status(200).send(ropa);
});

//DELETE ropa
router.delete("/:_id", auth, async(req, res) => {
    //buscamos usuario
    const usuario = await Usuario.findById(req.usuario._id);
    //si no existe usuario
    if(!usuario) return res.status(401).send("No existe usuario");
    //DElete
    const ropa = await Ropa.findByIdAndDelete(req.params._id);
    //si no existe ropa
    if(!ropa) return res.status(401).send("No hay Ropa con ese id");
    res.status(200).send({message: "Ropa eliminada"});
})

//exports
module.exports = router;
