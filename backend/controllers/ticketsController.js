const Ticket = require("../models/tickets");


const createTicket = async (req, res) => {
    try {
        const newTicket = new Ticket(req.body);
        const savedTicket = await newTicket.save();
        res.status(201).json({ message: "Ticket created!" , savedTicket });
    } catch (e) {
        res.status(500).json({ error: e.message });
    };
};

const getTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.status(200).json(tickets);
    } catch(e) {
        res.status(500).json({ error: e.message });
    }
};

const searchTickets = async (req, res) => {
    try {
        const { query, hashtags } = req.query;

        const filters = {};

        if(query) {
            filters.$or = [
                { title: { $regex: query, $options: "i" } }, 
                { description: { $regex: query, $options: "i" } }
            ];
        };

        if(hashtags) {
            const hashtagArray = hashtags.split(",");
            filters.hashtags = { $in: hashtagArray };
        };

        const tickets = await Ticket.find(filters);
        res.status(200).json(tickets);
    } catch(e) {
        res.status(500).json({ error: e.message });
    }
};

const updateTickets = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, status, priority, description, department, hashtags, agentID } = req.body;
  
      // Carregar o ticket atual para comparar os valores antigos com os novos
      const currentTicket = await Ticket.findById(id);
  
      if (!currentTicket) {
        return res.status(404).json({ error: "Ticket not found" });
      }
  
      // Adicionar as atualizações específicas ao campo 'updates'
      const updateActions = [];
  
      if (title !== currentTicket.title) {
        updateActions.push("Updated title");
      }
      if (status !== currentTicket.status) {
        updateActions.push("Updated status");
      }
      if (priority !== currentTicket.priority) {
        updateActions.push("Updated priority");
      }
      if (description !== currentTicket.description) {
        updateActions.push("Updated description");
      }
      if (department !== currentTicket.department) {
        updateActions.push("Updated department");
      }
      if (hashtags && hashtags.join(',') !== currentTicket.hashtags.join(',')) {
        updateActions.push("Updated hashtags");
      }
  
      const updates = updateActions.map((action) => ({
        timestamp: new Date(),
        authorId: req.userId, // Aqui você deve garantir que tenha o ID do autor (usuário logado)
        action
      }));
  
      // Atualiza o ticket e adiciona a lista de ações realizadas no campo 'updates'
      const updatedTicket = await Ticket.findByIdAndUpdate(
        id,
        {
          $set: {
            title,
            status,
            priority,
            description,
            department,
            hashtags: hashtags || [], // Garantindo que hashtags sejam um array, caso não seja enviado
            agentID, // Atualiza o agentID
          },
          $push: { updates: { $each: updates } } // Adiciona as atualizações de ações
        },
        { new: true, runValidators: true }
      );
  
      res.status(200).json(updatedTicket);  // Retorna o ticket atualizado
    } catch (e) {
      console.error("Erro ao atualizar ticket:", e);  // Log de erro
      res.status(500).json({ error: e.message });
    }
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
        res.status(500).json({ error: e.message });
    };
};

module.exports = {
    createTicket,
    getTickets,
    searchTickets,
    updateTickets,
    deleteTickets,
};