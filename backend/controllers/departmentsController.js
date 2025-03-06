const Department = require("../models/departments");


const createDepartment = async (req, res) => {
    try {
        const newDepartment = new Department(req.body);
        const savedDepartment = await newDepartment.save();
        res.status(201).json({ message: "Department created!" , savedDepartment });
    } catch (e) {
        res.status(500).json({ error: e.message });
    };
};

const getDepartments = async (req, res) => {
    try {
        const Departments = await Department.find();
        res.status(200).json(Departments);
    } catch(e) {
        res.status(500).json({ error: e.message });
    }
};

const updateDepartments = async (req, res) => {
    try {
        const { id } = req.params;
        const { agentIds, agents } = req.body;  // Extrai os campos 'agentIds' e 'agents' da requisição

        // Atualiza o departamento, adicionando o usuário aos arrays
        const updatedDepartment = await Department.findByIdAndUpdate(
            id,
            { 
                $push: { agentIds: agentIds },   // Adiciona o ID do usuário no campo 'agentIds'
                $addToSet: { agents: agents }    // Adiciona o nome do usuário no campo 'agents' (sem duplicação)
            },
            { new: true, runValidators: true }   // Retorna o documento atualizado
        );

        if (!updatedDepartment) {
            return res.status(404).json({ error: "Department not found" });
        }

        res.status(200).json(updatedDepartment);  // Retorna o departamento atualizado
    } catch (e) {
        res.status(500).json({ error: e.message });  // Em caso de erro, retorna uma mensagem
    }
};


const deleteDepartments = async (req, res) => {
    try {
        const { id } = req.params; //pega o id do Department a partir da URL
        const deletedDepartment = await Department.findByIdAndDelete(id);

        if(!deletedDepartment) {
            return res.status(404).json({ e: "Department not found " });
        };

        res.status(200).json({ message: "Department removed "})
    } catch(e) {
        res.status(500).json({ error: e.message });
    };
};

module.exports = {
    createDepartment,
    getDepartments,
    updateDepartments,
    deleteDepartments,
};