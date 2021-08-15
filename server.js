const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const app = express();

const mysqldump = require('mysqldump');



// enviroments vars
require('dotenv').config();

// handlebars engine view
app.engine('.hbs',
    exphbs({
        defaultLayout: 'main-layout',
        extname: '.hbs'
    })
);
app.set('view engine', '.hbs');
app.set('views', './src/frontend/views');
app.use(express.static(path.join(__dirname+'/src/frontend', 'static')));

app.use(express.static(path.join(__dirname+'/src/api/biblioteca_virtual/backup', 'static')));

//Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(express.json({extended: true}));




//Routes pages
app.use('/', require('./src/frontend/routes'));

// Route api
app.use('/api/v1/calificaciones', require('./src/api/registro_calificaciones/routes'));
app.use('/api/v1/biblioteca', require('./src/api/biblioteca_virtual/routes'));





//Starting the server
app.listen(app.get('port'), () => console.log(`server on port ${app.get('port')}`));




module.exports = app;