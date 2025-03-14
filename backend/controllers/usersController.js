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
        let updateData = { ...req.body }; // Copia todos os dados de atualização

        // Se a senha foi fornecida no corpo da requisição, criptografe-a
        if (req.body.password) {
            const hashedPassword = await hashPassword(req.body.password); 
            updateData.password = hashedPassword;  
        }

        // Atualize o usuário no banco de dados com os dados modificados
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: updateData },  // Envia os dados de atualização, incluindo a senha criptografada, se fornecida
            { new: true, runValidators: true }
        );

        // Se o usuário não for encontrado, retorne um erro
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        console.log("Usuário atualizado:", updatedUser);  // Adicione um log para garantir que o usuário foi atualizado

        res.status(200).json(updatedUser);  // Envia o usuário atualizado como resposta
    } catch (e) {
        console.error("Erro ao atualizar o usuário:", e);  // Log de erro
        res.status(500).json({ error: e.message });  // Retorna o erro para o cliente
    }
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
    console.log('Requisição recebida para login');
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        res.status(200).json({ message: "Login successful", user });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};



module.exports = {
    createUsers,
    getUsers,
    updateUsers,
    deleteUsers,
    loginUser,
};