const {Pool} = require('pg')

module.exports = new Pool({
    user: 'postgres',
    password: "mga9HUhl",
    host:"localhost",
    port: 5432,
    database: "foodfy"
})