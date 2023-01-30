require('dotenv').config();

//1. IMPORTAMOS EL MODELO
const Server = require('./models/server')

// 2. INSTANCIAMOS EL SERVIDOR O LA CLASE
const server = new Server()

//3. PONGO A ESCUCHAR EL SERVIDOR
server.listen()