const express = require("express");
const app = express();
const port = 8000;

app.use(express.static(__dirname + "/public"));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use('/static', express.static("static"));


app.use(express.json() );
app.use(express.urlencoded({extended:true})); 

app.get('/', function (req, res){
  res.render('index');
});

/*app.post('/', function(req, res){
  const informacion = req.body;
  console.log(informacion);
  res.render('index', { 
    nombre: req.body.nombre, 
    ubicacion: req.body.ubicacion, 
    lenguaje: req.body.lenguaje, 
    comentario: req.body.comentario
  });
}); */

// Lanzamos nuestra aplicación
const server = app.listen(port, function() {
  console.log('Escuchando en el puerto ' + port);
});

// Ahora creamos nuestras funciones de Sockets
const io = require('socket.io')(server);

// cuando me conecte con algún cliente
io.on('connection', function(socket) {

  socket.on('formulario_publicacion', function(inf) {
    socket.emit('mensaje_actualizado', inf);
    const lucky = Math.floor(Math.random()*1000 + 1);    
    socket.emit('numero_aleatorio', {lucky:lucky});
    //console.log(inf);
  });
  

});
