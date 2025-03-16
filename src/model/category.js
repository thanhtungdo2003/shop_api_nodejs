import connection, { insert } from "../storage/sqlservice";

class Category {
    static getAll(callback){
        connection.query("SELECT * FROM category", (err, results) => {
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