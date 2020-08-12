const express = require('express')
const routes = express.Router()
const receitas = require('./app/controllers/receitas')
const recipes = require('./app/controllers/admin')
const chefs = require('./app/controllers/chefs')

routes.get('/', receitas.index)
routes.get('/receitas', receitas.receitas)
routes.get('/sobre', receitas.sobre)
routes.get('/prato', receitas.show)

routes.get("/admin/recipes", recipes.index); // Mostrar a lista de receitas
routes.get("/admin/recipes/create", recipes.create); // Mostrar formulário de nova receita
routes.post("/admin/recipes", recipes.post); // Cadastrar nova receita
routes.get("/admin/recipes/:id", recipes.show); // Exibir detalhes de uma receita
routes.get("/admin/recipes/:id/edit", recipes.edit); // Mostrar formulário de edição de receita
routes.put("/admin/recipes", recipes.put); // Editar uma receita
routes.delete("/admin/recipes", recipes.delete); // Deletar uma receita

routes.get("/admin/chefs", chefs.index)
module.exports = routes