const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new mongoose.Schema({
    "name": { type: String, required: true },
    "email": { type: String, required: true },
    "password": { type: String, required: true },
    "role": { type: String, enum: ["client", "agent", "admin"] }, //client, agent, admin
});

const Model = mongoose.Model("users", schema);

module.exports = Model