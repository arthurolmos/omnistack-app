const Booking = require('../models/Booking')

module.exports = {
    async store(req, res) {
        const { user_id } = req.headers
        const { spot_id } = req.params
        const { date } = req.body

        const booking = await Booking.create({
            user: user_id,
            spot: spot_id,
            date
        })

        //Populate pega automaticamente as informações do Objeto e traz todos os dados. Função do MongoDB
        await booking.populate('spot').populate('user').execPopulate()

        return res.json(booking)
    }
}