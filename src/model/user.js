import connection, { insert } from "../storage/sqlservice";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

async function hashPassword(password) {
    const saltRounds = 3; // Số vòng lặp để tăng độ bảo mật
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
}
async function comparePassword(inputPassword, hashedPassword) {
    const match = await bcrypt.compare(inputPassword, hashedPassword);
    return match; // true nếu đúng, false nếu sai
}
class User {
    static async userRegister(userModel, callback) {
        try {
            const { userName, password, email } = userModel;
            const hashedPassword = await hashPassword(password);
            connection.query("CALL sp_user_register(?, ?, ?)", [userName, email, hashedPassword], (err, results) => {
                if (err) return callback(err, null);
                callback(null, results);
            });
        } catch {
            res.status(500).json({ error: "Lỗi khi đăng ký tài khoản", details: error.message });
        }
    }
    static async login(userModel, callback) {
        const { userName, password, isAutoAuth } = userModel;

        connection.query("CALL sp_user_get_by_user_name(?)", [userName], async (err, results) => {
            if (err) return callback(err, null);

            const user = results[0]?.[0]; // Lấy user từ kết quả query (tránh lỗi nếu kết quả là mảng lồng)
            if (!user) return callback({ statusCode: 400, data: { error: "Tên đăng nhập không tồn tại" } });

            // So sánh mật khẩu với hash trong DB
            if (!isAutoAuth) {
                const isMatch = await bcrypt.compare(password, user.hass_pass);
                if (!isMatch) {
                    return callback({ statusCode: 400, data: { error: "Mật khẩu không chính xác" } });
                }
            }

            // Tạo JWT token
            const payload = { userName: userName, email: user.email, isAutoAuth: true };
            const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "30d" });
            user.hass_pass = "";
            user.token = token;
            
            return callback(null, user);
        });
    }
}
export default User;