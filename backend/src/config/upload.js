const multer = require('multer') //Responsavel por upload de Multifiles
const path = require('path') //Formata o caminho do disco com / ou \ de acordo com o SO


module.exports = {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'), //__dirname: variavel global que se refere a pasta atual
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname) //Pega a extensão do arquivo
            const name = path.basename(file.originalname, ext) //Pega o nome do arquivo - extensão

            //Callback para formar o nome do arquivo
            //Parametros: erro, nome do arquivo (nome-data-extensão)
            cb(null, `${name}-${Date.now()}${ext}`)
        }
    })
}

/*Arquivo de configuração para upload de imagens, utilizando o Multer, seguindo sua documentação*/