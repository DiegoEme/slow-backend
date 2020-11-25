const  express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//modulos creados
const usuario = require("./routes/usuario");
const auth = require("./routes/auth");
const catalogo = require("./routes/catalogo");

//app
const app = express();
app.use(cors())
app.use(express.json());
app.use("/api/usuario/", usuario);
app.use("/api/auth/", auth);
app.use("/api/catalogo", catalogo);

//puerto de ejecucion
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Ejecutando en puerto: " + port));

//regristro mongoose
mongoose.connect("mongodb://localhost/slow", {useNewUrlParser: true,
 useFindAndModify: false, 
 useCreateIndex: true, 
 useUnifiedTopology: true
})
.then (()=> console.log("conexion con mongo: OK"))
.catch((error) => console.log("conexion con mongo: OFF"))