const fs = require('fs')
const Recipe = require('../models/recipe.js')
const File = require('../models/file')
const RecipeFile = require('../models/recipe_file')

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
    async post(req,res){
        const keys = Object.keys(req.body)
        for(key of keys){
            if(req.body[key] == ""){
                return res.send('Please, fill al fields')
            }
        }

        if(req.files.lenght == 0) return res.send('Please, send at least one image')

        let results = await Recipe.create(req.body)

        const recipeId = results.rows[0].id

        const fileResults = req.files.map(file=>File.create({...file}))
        
        const file_Id = fileResults.rows.id

        results = RecipeFile({...req.body, file_id: file_Id, recipe_id: recipeId})
        
        await Promise.all(fileResults)

        return res.redirect(`admin/recipes/${recipeId}`)
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
        Recipe.delete(req.body.id,()=>{
            return res.redirect('/admin/recipes')
        })
    }
}