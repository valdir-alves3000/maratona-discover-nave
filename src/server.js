const express = require("express");
const server = express();
const routes = require("./routes");
const path = require("path");

//template engine
server.set('view engine', 'ejs');

//mudar o localização da pasta views
server.set('views', path.join(__dirname, 'views'));

//habilitar arquivos statics
server.use(express.static("public"));

//usar dados body vindos da url
server.use(express.urlencoded({ extended: true }));

//routes
server.use(routes);

const port = process.env.APP_URL || 3000

server.listen(port, () => console.log('rodando'));