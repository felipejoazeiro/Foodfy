const Chef = require('../models/chef')
const {date} = require('../../lib/utils')

module.exports={
    index(req,res){
        Chef.all((chefs)=>{
            return res.render('chefs/index',{chefs})
        })
    },
    create(req,res){
        return res.render('chefs/create')
    },
    post(req,res){
        const keys = Object.keys(req.body)
        for(key of keys){
            if(req.body[key] == ""){
                return res.send('Please, fill all fields')
            }
        }
        Chef.create(req.body,(chef)=>{
            return res.redirect(`/admin/chefs/${chef.id}`)
        })
    },
    show(req,res){
        Chef.find(req.params.id,(chef)=>{
            if(!chef) return res.send('Chef not found')
            Chef.findRecipes(req.body,(recipes)=>{
                return res.render('chefs/show',{chef,recipes})
            })
        })
    },
    edit(req,res){
        Chef.chef(req.params.id,(chefs)=>{
            if(!chefs) return res.send('Chef não encontrado')
            return res.render('chefs/edit',{chefs})
        })
    },
    put(req,res){
        const keys = Object.keys(req.body)
        for(key of keys){
            if(req.body[key] == ""){
                return res.send('Please, fill all fields')
            }
        }
        Chef.update(req.body,()=>{
            return res.redirect(`/admin/chefs`)
        })
    },
    delete(req,res){
        Chef.delete(req.body.id,()=>{
            return res.redirect('/admin/chefs')
        })
    }
}