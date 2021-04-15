const express = require('express')
const server = express()

const path = require('path')
const routes = require('./routes')

const PORT = process.env.PORT || 3000

// alterar a localização da pasta views
server.set('views', path.join(__dirname, 'views'))

// habilitar arquivos statics
server.use(express.static("public"))

//utilizar template engine
server.set('view engine', 'ejs')

//usar dados body vindos da url
server.use(express.urlencoded({ extended:  true }))

//routes
server.use(routes)

//localizando URL da aplicação
server.listen(PORT, () => console.log(`Listening on ${PORT}`))
