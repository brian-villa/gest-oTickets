const express = require("express");
const router = express.Router();

// Importa controladores
const ticketController = require("../controllers/ticketsController");
const userController = require("../controllers/usersController");

// Rotas para Tickets
router.get("/tickets", ticketController.getTickets);
router.post("/tickets", ticketController.createTicket);
router.put("/tickets/:id", ticketController.updateTickets);
router.delete("/tickets/:id", ticketController.deleteTickets);


module.exports = router;