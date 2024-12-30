const express = require("express");
const router = express.Router();

const {
        createDepartment, 
        getDepartments, 
        updateDepartments, 
        deleteDepartments
} = require("../controllers/departmentsController");

//Criar um Department $POST
router.post("/", createDepartment);

//Listar Departments $GET
router.get("/", getDepartments);

// Atualizar um Department existente $PUT
router.put("/:id", updateDepartments);

// Excluir um Department existente $DELETE
router.delete("/:id", deleteDepartments)

module.exports = router;