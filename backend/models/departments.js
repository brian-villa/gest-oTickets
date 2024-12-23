const mongoose = required("mongoose");

const schema = mongoose.schema({
    "name": "Support",
    "agents": ["agentUser1", "agentUserId2"]
})

const Model = mongoose.Model("users", schema);

module.exports = Model