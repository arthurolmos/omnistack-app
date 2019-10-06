const express = require('express')

const multer = require('multer')
const uploadConfig = require('./config/upload')

const SessionController = require('./controllers/SessionController')
const SpotController = require('./controllers/SpotController')
const DashboardController = require('./controllers/DashboardController')
const BookingController = require('./controllers/BookingController')


const routes = express.Router()
const upload = multer(uploadConfig)

//req.query: acessar query params (GET)

//req.params: acessar route params para edição e delete (PUT e DELETE). Tambem serve para referenciar um item especifico
//em uma rota, como usar o ID para acessar um objeto. Exemplo: url.../:id/bookings

//req.body: acessar corpo da requisição (POST)


routes.post('/sessions', SessionController.store)

routes.post('/spots', upload.single('thumbnail'), SpotController.store)
routes.get('/spots', SpotController.index)

routes.get('/dashboard', DashboardController.show)

routes.post('/spots/:spot_id/bookings', BookingController.store)


module.exports = routes