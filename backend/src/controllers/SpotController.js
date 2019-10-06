const Spot = require('../models/Spot')
const User = require('../models/User')

module.exports = {
    async index(req, res) {
        const { tech } = req.query

        //Busca a tech dentro do array de Techs do model
        const spots = await Spot.find({ techs: tech })

        return res.json(spots)
    },


    async store(req, res){
        const { filename } = req.file
        const { company, techs, price} = req.body
        const { user_id} = req.headers //Headers é utilizado para enviar contextos da aplicação

        //Checa se o User existe, senão retorna um erro
        const user = await User.findById(user_id)
        if( !user ){
            return res.status(400).json({ error: 'User does not exist!' })
        }

        const spot = await Spot.create({
            user: user_id,
            thumbnail: filename,
            company,
            techs: techs.split(',').map(tech => tech.trim()), //percorre o array removendo os espaços, depois quebra por virgula
            price
        })

        return res.json(spot)
    }
}