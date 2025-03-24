import connection, { insert } from "../storage/sqlservice";

class Category {
    static getAll(callback){
        connection.query("SELECT * FROM category", (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
          });
    }
    static getByPage(page, row, callback){
        connection.query("CALL sp_category_get_by_page(?, ?)",[page, row], (err, results) => {
            if (err) return callback(err, null);
            callback(null, results[0]);
          });
    }
    static delete(category_id, callback){
        connection.query("DELETE FROM category WHERE category_id = ?",[category_id], (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
          });
    }
    static create(datas, callback) {
        insert("category", datas, (err, result)=>{
            if (err) return callback(err, null);
            callback(null, result.affectedRows);
        })
    }
}
export default Category;