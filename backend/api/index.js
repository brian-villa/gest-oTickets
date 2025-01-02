const express = require("express");
const router = express.Router();

// Importa controladores
const ticketController = require("../controllers/ticketsController");
const userController = require("../controllers/usersController");
const departmentsController = require("../controllers/departmentsController");

// Rotas para Tickets
router.get("/tickets", ticketController.getTickets);
router.post("/tickets", ticketController.createTicket);
router.put("/tickets/:id", ticketController.updateTickets);
router.delete("/tickets/:id", ticketController.deleteTickets);

// Rotas para Users
router.get("/users", userController.getUsers);
router.post("/users", userController.createUsers);
router.put("/users/:id", userController.updateUsers);
router.delete("/users/:id", userController.deleteUsers);

// Rota para login
router.post("/users/login", userController.loginUser);


// Rotas para Departments
router.get("/departments", departmentsController.getDepartments);
router.post("/departments", departmentsController.createDepartment);
router.put("/departments/:id", departmentsController.updateDepartments);
router.delete("/departments/:id", departmentsController.deleteDepartments);

module.exports = router;
