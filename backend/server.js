const express = require("express")
const helmet = require("helmet");
const csrf = require("csurf");
const path = require("path")

const db = require('./utils/dbConnect')
const apiRoutes = require("./api");

const app = express()

//Middlewares
const csrfProtection = csrf({ cookie: true });

app.use(express.json());
app.use(helmet());
app.use(csrfProtection);

//chamada das rotas na api
app.use("/api", apiRoutes);

// enviar o token CSRF ao cliente
app.get("/api/csrf-token", (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});

//conectando com o banco de dados
db.connect()

//executando o servidor 
const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Server is listening on port ${port}`))