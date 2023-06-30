// importar o express
const express = require("express");
const app = express();
//responsavel emadiminstar a estrutura do formulario em javascript
const bodyParser = require("body-parser");

//carregando a conexcão do banco de dados
const connection = require("./database/database");
//importando o model da tabela
const Pergunta = require("./database/pergunta");
//database
connection
         .authenticate()
        .then(()=> {
            console.log("conexão feita com sucesso com o banco de dados");
        })
        .catch((msgErro)=>{
            console.log(msgErro);
        })
//Estou dizendo para o Express usar o EJS como View engine
app.set("view engine","ejs");
//Essa linha de comando é para introduzir arquivos estaticos
app.use(express.static('public')); 

//decodificar o que for escrito dentro do formulario
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());//permiti que se leia formulario em forma de json com api

// criando rotas
app.get("/",(req,res) => { 
   Pergunta.findAll({row: true, order:[
    ['id','DESC'] // DESC significa ordernar decrescente, ASC crescente
   ]}).then(perguntas => {
    res.render("index",{
        perguntas: perguntas
    });
   });


});
//rotas
app.get("/perguntar",(req,res) => {
    res.render("perguntar");
});
//Receber os dados do formulario
app.post("/salvarpergunta",(req,res) => {
    //recebendo os dados do formulario
    let titulo = req.body.titulo;
    let descricao = req.body.descricao;
    //salvando no banco de dados
    Pergunta.create({                       
titulo: titulo,
descricao: descricao
    }).then(()=> {
        res.redirect("/")
    })
});

app.get("/pergunta/:id",(req,res)=>{
    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined){//pergunta encontrada
            res.render("pergunta",{
                pergunta: pergunta
            })
        }else{//pergunta não encontrada
            res.redirect("/");
        }
    })
})

//rodar a aplicação
app.listen(8080,()=>{
    console.log("App rodando normalmente, sem problemas!!!!!");
})