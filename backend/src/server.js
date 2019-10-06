const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')

const routes = require('./routes')


//Configuração do App = é um app Express
const  app = express()

//Configuração do Mongoose para conexão com MongoDB
mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack-uop6q.mongodb.net/semana09?retryWrites=true&w=majority', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})

//"Dependencias" do Express. Avisa que ele deve usar Json e Routes
app.use(cors()) //Controla o acesso ao backend. Precisa vir antes do resto das dependencias, senão bloqueia o acesso antes de chegar nele
app.use(express.json())
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads'))) //Rota para acessar arquivos estáticos
app.use(routes)

//Porta para o Server ouvir
app.listen(3333)
