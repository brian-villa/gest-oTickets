const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    "name": "Brian Villanova",
    "email": "email@email.com",
    "password": "12345",
    "role": "client", //client, agent, admin
});

const Model = mongoose.Model("users", schema);

module.exports = Model