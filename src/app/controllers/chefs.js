const Chef = require('../models/chef')

module.exports={
    index(req,res){
        return res.render('chefs/index')
    }
}