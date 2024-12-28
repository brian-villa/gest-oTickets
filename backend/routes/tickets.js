const express = require("express");
const router = express.Router();

const {
        createTicket, 
        getTickets, 
        updateTickets, 
        deleteTickets
} = require("../controllers/ticketsController");

//Criar um ticket $POST
router.post("/", createTicket);

//Listar tickets $GET
router.get("/", getTickets);

// Atualizar um ticket existente $PUT
router.put("/:id", updateTickets);

// Excluir um ticket existente $DELETE
router.delete("/:id", deleteTickets)

module.exports = router;