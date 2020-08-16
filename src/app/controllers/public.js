const Recipe = require('../models/public')

module.exports = {
    index(req,res){
        Recipe.all((recipes)=>{
            return res.render('receitas/index',{recipes})
        })
    },
    receitas(req,res){
        return res.render('receitas/receitas',{items:data.receitas})
    },
    sobre(req,res){
        return res.render('receitas/sobre')
    },
    show(req,res){
        const id = req.query.id
        const receitaFound = data.receitas.find((receita)=>{
            return receita.id == id
        })
        if(!receitaFound){
            return res.send('Página não encontrada')
        }
        const receita = {
            ...receitaFound
        }
        return res.render('receitas/prato',{receita})
    }
}

