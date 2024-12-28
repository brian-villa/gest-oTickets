const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

const {
    createUsers,
    getUsers,
    updateUsers,
    deleteUsers,
    loginUser
} = require("../controllers/usersController");

//Cria um usuario
router.post( //validando entrada de usuários SQL INJECTION
    "/",
    [
        body("email").isEmail().withMessage("Invalid email"),
        body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    ],
    createUsers
);

// Login
router.post(
    "/login",
    [
        body("email").isEmail().withMessage("Invalid email"),
        body("password").notEmpty().withMessage("Password is required"),
    ],
    loginUser
);

//Listar usuários
router.get("/", getUsers);

//Atualizar usuário
router.put("/:id", updateUsers);

//excluir usuário
router.delete("/:id", deleteUsers);

module.exports = router;