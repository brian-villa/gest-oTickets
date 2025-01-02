const express = require("express");
const helmet = require("helmet");
const csrf = require("csurf");
const cors = require("cors"); // Importando o CORS

const db = require('./utils/dbConnect');
const apiRoutes = require("./api");

const app = express();

// Middlewares
app.use(express.json());
app.use(helmet());

// Habilitar CORS para permitir requisições do frontend (localhost:3000)
app.use(cors({
  origin: 'http://localhost:3000', // Permitir apenas localhost:3000
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
}));

// CSRF Protection
const csrfProtection = csrf({ cookie: true });
// app.use(csrfProtection);

// Chamada das rotas na API
app.use("/api", apiRoutes);

// Enviar o token CSRF ao cliente
app.get("/api/csrf-token", (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});

// Conectando com o banco de dados
db.connect();

// Executando o servidor
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server is listening on port ${port}`));
