//criando os module de conexão com o banco de dados
const Sequelize = require("sequelize");
const connection = require("./database");

//criando tabelas do banco de dados OBS: tipo string, texto curto e tipo TEXT, testo longos.
//define os campos da tabela neste trecho de codigo
const Pergunta = connection.define('perguntas',{
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});
//Esse comando serve para criar a tabela, se por acaso ele já existir ele não vai forçar a criação de uma nova.
Pergunta.sync({force: false}).then(()=>{
    console.log("tabela criada com sucesso")
});
module.exports = Pergunta;