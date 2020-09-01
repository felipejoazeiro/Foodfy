const {date} = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
    all(callback){
        db.query(`SELECT recipes.*, chefs.id AS chef_id FROM recipes INNER JOIN chefs ON (recipes.chef_id = chefs.id) `,(err,results)=>{
            if(err) throw 'Database error'
            callback(results.rows)
        })
    },
    create(data,callback){
        const query = `
            INSERT INTO recipes(
                title,
                ingredients,
                preparation,
                information,
                chef_id,
                created_at
            ) VALUES ($1,$2,$3,$4,$5,$6)
            RETURNING id
        `
        const values = [
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            data.chef_id,
            date(Date.now()).iso
        ]
        return db.query(query,values)
    },
    chefSelectOptions(callback){
        db.query(`
            SELECT name, id FROM chefs
        `,(err,results)=>{
            if(err) throw 'Database error'
            callback(results.rows)
        })
    },
    find(id, callback){
        db.query(`
            SELECT recipes.*, 
            chefs.name AS chef_name 
            FROM recipes LEFT JOIN chefs 
            ON (recipes.chef_id = chefs.id)
            WHERE recipes.id = $1
        `,[id],(err,results)=>{
            if(err) throw `Database error ${err}`
            callback(results.rows[0])
        })
    },
    update(data,callback){
        const query = `
            UPDATE recipes SET
                title=($1),
                ingredients=($2),
                preparation=($3),
                information=($4),
                chef_id=($5)
            WHERE id = $6
        `
        const values = [
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            data.chef_id,
            data.id
        ]
        db.query(query,values,(err, results)=>{
            if(err) throw `Ocorreu um erro ${err}`
            callback()
        })
    },
    delete(id,callback){
        db.query(`DELETE FROM recipes WHERE id = $1`,[id],(err,results)=>{
            if(err) throw ` Database error`
            return callback()
        })
    }
}