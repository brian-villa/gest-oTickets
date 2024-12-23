const express = require("express")
const path = require("path")

const db = require('./database')

const app = express()


//conectando com o banco de dados
db.connect()

//executando o servidor 
const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Server is listening on port ${port}`))