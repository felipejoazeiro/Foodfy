const data = require('../data.json')


exports.index = (req,res)=>{
    return res.render('receitas/index')
}

exports.receitas = (req,res)=>{
    return res.render('receitas/receitas',{items:data.receitas})
}

exports.sobre = (req,res)=>{
    return res.render('receitas/sobre')
}

exports.show = (req,res)=>{
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