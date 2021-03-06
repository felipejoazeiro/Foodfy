const {date} = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
    all(callback){
        db.query(`SELECT * FROM recipes`,(err,results)=>{
            if(err) throw 'Database error'
            callback(results.rows)
        })
    },
    create(data,callback){
        const query = `
        INSERT INTO recipes(
            image,
            title,
            ingredients,
            preparation,
            information,
            chef_id,
            created_at
        ) VALUES ($1,$2,$3,$4,$5,$6,$7)
        RETURNING id
        `
        const values = [
            data.image,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            data.chef_id,
            date(Date.now()).iso
        ]
        db.query(query,values,(err,results)=>{
            if(err) throw `Database Error ${err}`
            callback(results.rows[0])
        })
    }
}