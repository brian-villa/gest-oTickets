const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new mongoose.Schema({
    "title": { type: String, required: true },
    "description": { type: String, required: true },
    "status": { type: String, enum: ["open", "in-progress", "closed"], default: "open" }, //open, assigned, closed
    "priority": { type: String, enum: ["high", "medium", "low"], default: "medium" }, //high, medium or low
    "department": { type: String, required: true },
    "clientId": { type: Schema.Types.ObjectId, ref: "User" },
    "agentId": { type: Schema.Types.ObjectId, ref: "User"  },
    "updates": [{
        "timestamp": { type: Date, default: Date.now() },
        "authorId": { type: Schema.Types.ObjectId, ref: "User" },
        "action": { type: String }
    }],
    "attachments": [{ type: String }] 
});

const Model = mongoose.model("tickets", schema);

module.exports = Model