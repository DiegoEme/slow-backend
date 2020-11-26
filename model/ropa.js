//modulos internos
const mongoose = require("mongoose");

//Esquema
const esquemaRopa = new mongoose.Schema({
  idUsuario: String,
  nombre: String,
  descripcion: String,
  sticker: String,
  fecha: {
    type: Date,
    default: Date.now,
  },
});

//Exports
const Ropa = mongoose.model("ropa", esquemaRopa);
module.exports.Ropa = Ropa;
