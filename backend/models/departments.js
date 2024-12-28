const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = mongoose.Schema({
    "name": { type: String, required: true },
    "agents": [{ type: String }]
})

const Model = mongoose.model("departments", schema);

module.exports = Model