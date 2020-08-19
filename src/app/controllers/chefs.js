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
    }
}