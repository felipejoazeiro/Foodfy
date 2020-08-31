const db = require('../../config/db')

module.exports = {
    create(data){
        const query = `
            INSERT INTO recipes_file(
                recipe_id,
                file_id
            ) VALUES ($1,$2)
            RETURNING id
        `
        const values = [
            data.recipe_id,
            data.file_id
        ]
        return db.query(query,values)
    }
}