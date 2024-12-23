const Ticket = require("../models/tickets");


const createTicket = async (req, res) => {
    try {
        const newTicket = new Ticket(req.body);
        const savedTicket = await newTicket.save();
        res.status(201).json(savedTicket);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.status(200).json(tickets);
    } catch(e) {
        res.status(500).json({ e: error.message });
    }
};

const updateTickets = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTicket = await Ticket.findByIdAndUpdate(
            id,
            { $set: req.body }, //atualiza os campos no body da req
            { new: true, runValidators: true } //retorna o documento atualizado e valida os dados
        );

        if(!updatedTicket) {
            return res.status(404).json({ error: "Ticket not found "});
        };

        res.status(200).json(updatedTicket);
    } catch(e) {
        res.status(500).json({ e: error.message });
    };
};

const deleteTickets = async (req, res) => {
    try {
        const { id } = req.params; //pega o id do ticket a partir da URL
        const deletedTicket = await Ticket.findByIdAndDelete(id);

        if(!deletedTicket) {
            return res.status(404).json({ e: "Ticket not found " });
        };

        res.status(200).json({ message: "Ticket removed "})
    } catch(e) {
        res.status(500).json({ e: error.message });
    };
};

module.exports = {
    createTicket,
    getTickets,
    updateTickets,
    deleteTickets,
};