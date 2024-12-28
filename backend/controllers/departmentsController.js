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
        const updatedDepartment = await Department.findByIdAndUpdate(
            id,
            { $set: req.body }, //atualiza os campos no body da req
            { new: true, runValidators: true } //retorna o documento atualizado e valida os dados
        );

        if(!updatedDepartment) {
            return res.status(404).json({ error: "Department not found "});
        };

        res.status(200).json(updatedDepartment);
    } catch(e) {
        res.status(500).json({ error: e.message });
    };
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