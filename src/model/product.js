import connection, { insert } from "../storage/sqlservice";

const productTableName = "product";
class Product {

  static getAll(callback) {
    connection.query("CALL sp_product_getall()", (err, results) => {
      if (err) return callback(err, null);
      callback(null, results[0]);
    });
  }

  static getNews(row, page, callback) {
    connection.query("CALL sp_product_getnew(?, ?)", [row, page], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results[0]);
    });
  }

  static getById(id, callback) {
    connection.query("CALL sp_product_get_by_id(?)", [id], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results[0]);
    });
  }

  static getByParams(inputs, callback) {
    const { row, page, keyword, category_slug, sort, get_type } = inputs;
    connection.query("CALL sp_product_get_by_params(?, ?, ?, ?, ?, ?)", [row, page, keyword, category_slug, sort, get_type], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results[0]);
    });
  }

  static create(productModel, callback) {
    insert(productTableName, productModel, (err, result) => {
      if (err) return callback(err, null);
      callback(null, result.affectedRows);
    });
  }

  static update(product, callback) {
    const { product_id, category_id, display_name, pramaters, description, price, inventory } = product;
    connection.query("CALL sp_product_update(?, ?, ?, ?, ?, ?, ?)",
      [product_id, category_id, display_name, pramaters, description, price, inventory], (err, result) => {
        if (err) return callback(err, null);
        callback(null, result.affectedRows);
      });
  }
  static delete(productId, callback) {
    connection.query("DELETE FROM product_images WHERE product_id = ?",
      [productId], (imgDeleteErr, result) => {
        if (imgDeleteErr) return callback(imgDeleteErr, null);
        connection.query("DELETE FROM product WHERE product_id = ?",
          [productId], (err, result) => {
            if (err) return callback(err, null);
            callback(null, result.affectedRows);
          });
      });
    
  }
  static setStatus(productId, status, callback) {
    connection.query("UPDATE product SET status = ? WHERE product_id = ?", [status, productId], (err, result) => {
      if (err) return callback(err, null);
      callback(null, result.affectedRows);
    });
  }
}

export default Product;