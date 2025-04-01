import connection from "../storage/sqlservice";

class Stats {
    static getRevenueByRangeOfTime(start, end, callback) {
        connection.query("CALL sp_stats_get_revenue_by_timerange(?, ?)", [start, end], (err, result) => {
            if (err) {
                return callback("Lỗi khi thống kê: " + err, null);
            }
            callback(null, result[0]);
        });
    }
    static getUserRegByRangeOfTime(start, end, callback) {
        connection.query("CALL sp_stats_get_user_reg_by_timerange(?, ?)", [start, end], (err, result) => {
            if (err) {
                return callback("Lỗi khi thống kê: " + err, null);
            }
            callback(null, result[0]);
        });
    }
    static getAmountOfProductSaleByRangeOfTime(start, end, sortType, callback) {
        connection.query("CALL sp_stats_get_sell_amount_of_product_by_timerange(?, ?, ?)", [start, end, sortType], (err, result) => {
            if (err) {
                return callback("Lỗi khi thống kê: " + err, null);
            }
            callback(null, result[0]);
        });
    }
}
export default Stats;