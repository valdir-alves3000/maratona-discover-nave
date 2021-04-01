const express = require("express");
const server = express();
const routes = require('./routes');

//template engine
server.set('view engine', 'ejs');

//habilitar arquivos statics
server.use(express.static("public"));

//usar dados body vindos da url
server.use(express.urlencoded({ extended: true }));

//routes
server.use(routes);

server.listen(3000, () => console.log('rodando'));