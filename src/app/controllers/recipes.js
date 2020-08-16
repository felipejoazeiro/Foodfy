const fs = require('fs')
const Recipe = require('../models/recipe.js')
const db = require('../../config/db.js')

module.exports = {
    index(req,res){
        Recipe.all((recipes)=>{
            return res.render('admin/admin',{recipes:recipes})
        })
    },
    create(req,res){
        Recipe.chefSelectOptions((options)=>{
            return res.render('admin/create',{chefOptions:options})
        })
    },
    post(req,res){
        const keys = Object.keys(req.body)
        for(key of keys){
            if(req.body[key] == ""){
                return res.send('Please, fill al fields')
            }
        }
        Recipe.create(req.body,(recipe)=>{
            return res.redirect(`/admin/recipes/${recipe.id}`)
        })
    },
    show(req,res){
        Recipe.find(req.params.id,(recipes)=>{
            if(!recipes) return res.send('Receita não encontrada')
            return res.render("admin/show", {recipes})
        })
    
    },
    edit(req,res){
        Recipe.find(req.params.id,(recipes)=>{
            if(!recipes) return res.send('Receita não encontrada')
            Recipe.chefSelectOptions((options)=>{
                return res.render("admin/edit", {recipes, chefOptions:options})
            })
        })
    },
    put(req,res){
        const keys = Object.keys(req.body)
        for(key of keys){
            if(req.body[key] == ""){
                return res.send('Please, fill all fields')
            }
        }
        Recipe.update(req.body, function(){
            return res.redirect(`/admin/recipes/${req.body.id}`)
        })
    },
    delete(req,res){
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
}