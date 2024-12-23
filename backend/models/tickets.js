const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    "title": "Issue logging in",
    "description": "I cant log in my account",
    "status": "open", //open, assigned, closed
    "priority": "high",
    "department": "Support",
    "clientId": "idUsuario",
    "agentId": "idAgent",
    "updates": [{
        "timestamp": "2023-12-01T10:00:00z",
        "authorId": "idAgent",
        "action": "status updated to assigned"
    }],
    "attachments": ["fil1.pdf", "file2.png"] 
});

const Model = mongoose.model("tickets", schema);

module.exports = Model