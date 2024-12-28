const User = require("../models/users");

const createUsers = async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json({ message: "User created!", savedUser });
    } catch (e) {
        res.status(500).json({ error: e.message });
    };
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch(e) {
        res.status(500).json({ error: e.message });
    };
};

const updateUsers = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set : req.body },
            { new: true, runValidators: true }
        );
        
        if(!updatedUser) {
            return res.status(404).json({ error: "User not found "});
        };

        res.status(200).json(updatedUser);
    } catch(e) {
        res.status(500).json({ error: e.message });
    };
};

const deleteUsers = async (req, res) => {
    try {
        const { id } = req.params; //pega o id do ticket a partir da URL
        const deletedUser = await User.findByIdAndDelete(id);

        if(!deletedUser) {
            return res.status(404).json({ e: "User not found " });
        };

        res.status(200).json({ message: "User removed "})
    } catch(e) {
        res.status(500).json({ error: e.message });
    };
};


module.exports = {
    createUsers,
    getUsers,
    updateUsers,
    deleteUsers,
};