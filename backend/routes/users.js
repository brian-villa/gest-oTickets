const express = require("express");
const router = express.Router();

const {
    createUsers,
    getUsers,
    updateUsers,
    deleteUsers
} = require("../controllers/usersController");

router.post("/", createUsers);

router.get("/", getUsers);

router.put("/:id", updateUsers);

router.delete("/:id", deleteUsers);

module.exports = router;