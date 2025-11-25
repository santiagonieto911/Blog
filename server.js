const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');

// configurar multer para guardar uploads en public/uploads
const uploadDir = path.join(__dirname, 'public', 'uploads');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // conservar nombre original (sencillo) - puedes mejorar sanitización si deseas
    cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '-'));
  }
});
const upload = multer({ storage: storage });

const app = express();
const PORT = 3000;

// Configuración de Express
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rutas
app.get('/', (req, res) => {
  res.render('portada', {
    title: 'Administración del Tiempo'
  });
});

app.get('/inicio', (req, res) => {
  res.render('index', {
    title: 'Mi Blog Minimalista',
    author: 'Tu Nombre'
  });
});

// Rutas para las 7 secciones
app.get('/seccion/1', (req, res) => {
  res.render('seccion1', { 
    title: 'Sección 1 - Infográfico de Administración del Tiempo'
  });
});

app.get('/seccion/2', (req, res) => {
  res.render('seccion2', { 
    title: 'Sección 2 - Hábitos de Personas Exitosas'
  });
});

app.get('/seccion/3', (req, res) => {
  res.render('seccion3', {
    title: 'Sección 3 - Sugerencias para Aprender Mejor'
  });
});

app.get('/seccion/4', (req, res) => {
  res.render('seccion4', { 
    title: 'Sección 4 - Toolkits'
  });
});

app.get('/seccion/5', (req, res) => {
  res.render('seccion5', { 
    title: 'Sección 5 - Reseña de Apps: Todoist y Freedom'
  });
});

app.get('/seccion/6', (req, res) => {
  res.render('seccion6', { 
    title: 'Sección 6 - Estrategias de Autocuidado'
  });
});

app.get('/seccion/7', (req, res) => {
  res.render('seccion7', { 
    title: 'Sección 7 - Videopodcast'
  });
});

// Ruta genérica para otras secciones
app.get('/seccion/:id', (req, res) => {
  const seccionId = req.params.id;
  res.render('seccion', { 
    id: seccionId,
    title: `Sección ${seccionId}`
  });
});

app.post('/seccion/4/upload', upload.single('infografico'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No se recibió archivo.');
  }
  // después de guardar el archivo, redirigimos a la misma página o mostramos enlace
  const publicPath = `/uploads/${req.file.filename}`;
  res.send(`<p>Archivo subido correctamente: <a href="${publicPath}" target="_blank">${req.file.originalname}</a></p><p><a href="/seccion/4">Volver</a></p>`);
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'Acerca de Mí' });
});

// Página que lista todas las secciones (vista separada)
app.get('/secciones', (req, res) => {
  res.render('secciones', { title: 'Secciones' });
});

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).render('404', { title: 'Página no encontrada' });
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Blog ejecutándose en http://localhost:${PORT}`);
});
