const mongoose = required("mongoose");
const { Schema } = mongoose;

const schema = mongoose.Schema({
    "name": { type: String, required: true },
    "agents": [{ type: String }]
})

const Model = mongoose.Model("users", schema);

module.exports = Model