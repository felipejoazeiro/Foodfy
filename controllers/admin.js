const data = require('../data.json')
const fs = require('fs')

exports.index = (req,res)=>{
    return res.render("admin/admin", {items: data.receitas})
}

exports.create = (req,res)=>{
    return res.render("admin/create")
}

exports.post = (req,res)=>{

    const id = Number(data.receitas.length + 1)

    data.receitas.push({
        id,
        ...req.body
    })  
    console.log(req.body)

    fs.writeFile('data.json', JSON.stringify(data,null,4), (err)=>{
        if(err) return res.send('Erro nas informações')
        return res.redirect('/admin/recipes')
    })
}

exports.show = (req,res)=>{
    const {id} = req.params
    const foundRecipe = data.receitas.find((receita)=>{
        return receita.id == id
    })
    if(!foundRecipe) return res.send ("Receita não encontrada")

    const receita = {
        ...foundRecipe
    }

    return res.render("admin/show", {receita})
}

exports.edit = (req,res)=>{
    const {id} = req.params
    const foundRecipe = data.receitas.find((receita)=>{
        return receita.id == id
    })
    if(!foundRecipe) return res.send ("Receita não encontrada")

    const receita = {
        ...foundRecipe
    }
    return res.render("admin/edit", {receita})
}

exports.put=(req,res)=>{
    const {id} = req.body
    let index = 0
    const foundRecipe = data.receitas.find((receitas, foundIndex)=>{
        if (receitas.id == id){
            index = foundIndex
            return true
        }
    })
    if(!foundRecipe) return res.send ("Receita não encontrada")

    const receita = {
        ...foundRecipe,
        ...req.body,
        id: Number(req.body.id)
    }

    data.receitas[index] = receita

    fs.writeFile('data.json', JSON.stringify(data,null,4),(err)=>{
        if(err) return res.send('Write error')
        return res.redirect(`/admin/recipes/${id}`)
    })
}

exports.delete = (req,res)=>{
    const {id} = req.body
    const filteredReceita = data.receitas.filter((receita)=>{
        return receita.id != id
    })

    data.receitas = filteredReceita

    fs.writeFile('data.json', JSON.stringify(data,null,4),(err)=>{
        if(err) return res.send('Write error')
    })
    return res.redirect('/admin/recipes')
}