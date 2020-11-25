//modulos node
const express = require("express");
const router = express.Router();

//Modulos internos
const Catalogo  = require("../model/catalogo");
const { Usuario } = require("../model/usuario");
const auth = require("../middleware/auth");
const cargarArchivo = require("../middleware/file")

//CREAR acrividad
router.post("/", auth, async (req, res) => {
  const usuario = await Usuario.findById(req.usuario._id);
  //si usuario no existe
  if (!usuario) return res.status(401).send("El usuario no existe");
  //si existe ususario creamos una prenda del catalogo
  const catalogo = new Catalogo({
    idUsuario: usuario._id,
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
  });

  //enviamos el resultado
  const result = await catalogo.save();
  res.status(200).send(result);
});

//CREAR Prenda con IMAGEN
router.post("/cargarArchivo", cargarArchivo.single("sticker"), auth, async(req, res) => {
  const url = req.protocol + "://" + req.get("host");
  //verificar si usuario existe
  const usuario = await Usuario.findById(req.usuario._id);
  //si no existe
  if(!usuario) return res.status(401).send("No existe ese usuario");

  //deifinimos la ruta d ela imagen
  let rutaImagen = null;
  if(req.file.filename ){
    rutaImagen = url + "/public/" + req.file.filename;
  } else {
    rutaImagen = null;
  }
  const catalogo = new Catalogo({
    idUsuario: usuario._id,
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    sticker: rutaImagen,
  })

  const result = await catalogo.save();
  res.status(200).send(result);
})

//READ catalogo
router.get("/lista", auth, async (req, res) => {
  //Buscamos el usuario logueado
  const usuario = await Usuario.findById(req.usuario._id);

  //si usuario no existe
  if(!usuario) return res.status(401).send("El usuario no existe");
  //Si si existe
  const catalogo = await Catalogo.find({"idUsuario": req.usuario._id});
  res.send(catalogo);
})

//UPDATE catalogo
router.put("/", auth, async (req, res) => {
  //buscamos usuario
  const usuario = await Usuario.findById(req.usuario._id);
  if(!usuario) return res.status(401).send("El usuario no existe");
  //hacemos update
  const catalogo = await Catalogo.findByIdAndUpdate(
    req.body._id,
    {
      idUsuario: usuario._id,
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
    },
    {
      new: true,
    }
    
  )

  // si no hay prendas
  if(!catalogo) return res.status(401).send("No hay prendas en el catalogo")

  //Si si hay 
  res.status(200).send(catalogo)
})

//DELETE catalogo
router.delete("/:_id", auth, async(req, res) => {
  //buscamos el ususario
  const usuario = await Usuario.findById(req.usuario._id);
  //si no existe usuario
  if(!usuario) return res.status(401).send("No existe usuaio");
  //eliminaod prenda en catalogo
  const catalogo = await Catalogo.findByIdAndDelete(req.params._id);
  //si no hay prenda
  if(!catalogo) return res.status(401).send("No hay prenda con ese ID");
  //si si hay prenda
  res.status(200).send({message: "Prenda Eliminada"})

})

module.exports = router;
