const mongoose = require('mongoose')
require('dotenv').config();

function connect() {

    mongoose.connect(process.env.MONGO_URI) //estabelecendo conexão com o banco de dados
    
    const db = mongoose.connection
    
    db.once('open', () => {
        console.log('Connected to database!')
    })
    
    db.on('error', console.error.bind(console, 'connection error: '))
}

module.exports = {
    connect
}