const mongoose = require("mongoose");

//Esquema

const esquemaCatalogo = new mongoose.Schema({
  idUsuario: String,
  nombre: String,
  descripcion: String,
  sticker: String,
  fecha: {
    type: Date,
    default: Date.now,
  },
});

const Catalogo = mongoose.model("catalogo", esquemaCatalogo);
module.exports = Catalogo;

