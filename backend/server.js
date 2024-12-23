const express = require("express")
const path = require("path")

const db = require('./database')
const apiRoutes = require("./api");

const app = express()

//Middlewares
app.use(express.json());

//chamada das rotas na api
app.use("/api", apiRoutes);

//conectando com o banco de dados
db.connect()

//executando o servidor 
const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Server is listening on port ${port}`))