const User = require("../models/users");
const { hashPassword, comparePassword } = require("../utils/pwd");

const createUsers = async (req, res) => {
    try {
        const { password, ...fields } = req.body;
        const hashedPassword = await hashPassword(password);

        const newUser = new User({ ...fields, password: hashedPassword });
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

const loginUser = async (req, res) => {
    try{
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        
        if(!user) {
            return res.status(404).json({ error: "User not found "});
        };

        const isPasswordValid = await comparePassword(password, user.password);
        if(!isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials" });
        };

        res.status(200).json({ message: "Login successful", user});

    } catch(e) {
        res.status(500).json({ error: e.message });
    };
};


module.exports = {
    createUsers,
    getUsers,
    updateUsers,
    deleteUsers,
    loginUser,
};