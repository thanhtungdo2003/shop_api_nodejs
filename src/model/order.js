import { randomUUID } from "crypto";
import connection from "../storage/sqlservice";

class Order {
    static create(newUid, orderReq, callback) {
        
        var { user_name, address, email, phone, feedback } = orderReq.info;
        const detailData = orderReq.detail;
        if (!user_name) user_name = 'NONE';
        if (!feedback) feedback = 'NONE';
        if (!email || !address || !phone) return;
        connection.query("CALL sp_order_create(?, ?, ?, ?, ?, ?, ?)",
            [newUid, user_name, address, email, feedback, phone, JSON.stringify(Object.values(detailData))], (err, result) => {
                if (err) return callback(err, null);
                callback(null, result);
            }
        )
    }
    static getByParams(getModel, callback){
        const {page, row, keyword, sort} = getModel;
        connection.query("CALL sp_order_get_by_params(?, ?, ?, ?)", [row, page, keyword, sort], (err, result) =>{
            if (err) return callback(err, null);
            callback(null, result[0]);
        })
    }
    static updateStatus(orderId, status, callback){
        if (!["PENDING", "PAID", "CANCELLED", "REFUNDED"].includes(status)){
            return callback("Lỗi: Trạng thái đơn hàng không xác định", null)
        }
        connection.query("UPDATE order_table SET status = ? WHERE order_id = ?", [status, orderId], (err, result) =>{
            if (err) return callback(err, null);
            callback(null, result[0]);
        })
    }
}
export default Order;