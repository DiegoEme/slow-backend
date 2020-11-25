//modulos de node
const multer = require("multer");

const directorio = "./public/";

//Diskstorage

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //si llga null se va catch
    cb(null, directorio);
  },
  filename: (req, file, cb) => {
    const filename =
      Date.now() + "-" + file.originalname.toLowerCase().split(" ").join("-");
      cb(null, filename)
  },
});

const cargarArchivo = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Solo se aceptan imágenes tipo png, y jpg"));
    }
  },
});

module.exports = cargarArchivo;