// Servidor
const express = require('express');
const Contenedor = require('./Contenedor.js');
const app = express();
const PORT = 8080;

// Importar productos
const contenedorProductos = new Contenedor('productos.txt');

// Para usar json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Para el motor de plantillas
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');  // Acá cambio de ejs a pug o a handlebars

// Rutas
app.get('/', (req, res) => {
    res.render('formulario');
});

app.get('/productos', async (req, res) => {
    const productos = await contenedorProductos.getAll();
    res.render('lista', {productos});
});

app.post('/productos', async (req, res) => {
    const producto = req.body;
    await contenedorProductos.save(producto);
    res.redirect('/productos');
});

const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${server.address().port}`);
});
server.on("error", error => console.log(`Encontramos el siguiente error en el servidor: ${error}`));



  