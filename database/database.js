//Criando a conexão com o banco de dados mysql


//chamando o sequelize
const Sequelize  = require('sequelize');

//conexão com o banco de dados "nome do banco", " login ", "senha","local","tipo de banco"
const connection = new Sequelize('guiaperguntas','root','1234',{
host: 'localhost',
dialect: 'mysql'
});

//exportando para utilizar em outros arquivos

module.exports = connection;

