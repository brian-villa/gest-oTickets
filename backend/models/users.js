const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new mongoose.Schema({
    "name": { type: String, required: true },
    "email": { type: String, required: true, unique: true },
    "password": { type: String, required: true },
    "role": { 
        type: String, 
        enum: ["client", "agent", "admin"], 
        default: "client" // Define o valor padrão para o role como 'client'
    },
});

const Model = mongoose.model("users", schema);

module.exports = Model