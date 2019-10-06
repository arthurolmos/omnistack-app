const mongoose = require('mongoose')

const SpotSchema = new mongoose.Schema({
    thumbnail: String,
    company: String,
    price: Number,
    techs: [String],
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    //Parametro do Mongoose para gerar o campo virtual sempre que for gerado um JSON da classe
    toJSON: {
        virtuals: true
    }
})

//Campo virtual para acesso a thumbnails
SpotSchema.virtual('thumbnail_url').get( function() {
    return `http://localhost:3333/files/${this.thumbnail}` //this.thumbnail pega o caminho do thumbnail
})

module.exports = mongoose.model('Spot', SpotSchema)