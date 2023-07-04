//criando os module de conexão com o banco de dados
const Sequelize = require("sequelize");
const connection = require("./database");

const Resposta = connection.define("resposta",{

    corpo: {
        type:Sequelize.TEXT,
        allowNull: false
    },
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

});


Resposta.sync({Force:false});
module.exports = Resposta;