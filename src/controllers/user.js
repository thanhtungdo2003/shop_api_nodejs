import jwt from 'jsonwebtoken'
import User from '../model/user';

export const login = (req, res) => {
    User.login(req.body, (err, result) => {
        if (err) {
            console.log("[JOIN] - "+req.body.userName)
            console.error("Lỗi:", err);
            return res.status(400).json({message: err.message});
        }
        res.cookie("shopvntt-user-token", result.token, {
            httpOnly: true, // Không cho JavaScript truy cập
            secure: process.env.NODE_ENV === "production", // Chỉ bật secure nếu chạy HTTPS
            sameSite: "Strict", // Chống CSRF
            maxAge: 30 * 24 * 60 * 60 * 1000 // Hết hạn sau 30 ngày
        });
        return res.json(result);
    });
}

export function userRegister(req, res) {
    try {
        User.userRegister(req.body, (err, result) => {
            if (err) {
                console.error("Lỗi:", err);
                return res.status(500).json({ error: "Lỗi ", details: err.message });
            }
            return res.json(result);
        });
    } catch {
        res.status(500).json({ error: "Lỗi khi khi đăng ký tài khoản", details: error.message });
    }
}

export const setStatus = (req, res) => {
    const { user_name, status } = req.body;
    User.setStatus(user_name, status, (err, result) => {
        if (err) console.error("Lỗi:", err);
        res.status(200).json({
            "message": "Cập nhật thành công",
            "excuse_result": result
        });
    });

};
export function addPerm(req, res) {
    User.addPerm(req.body, (err, result) => {
        if (err) {
            console.error("Lỗi:", err);
            if (err.sqlState === "23000") {
                return res.status(200).json({ message: "Người dùng này đã sở hữu quyền" });
            }
            return res.status(500).json({ error: "Lỗi ", details: err.message });
        }
        return res.json(result);
    });
}
export function getWithParams(req, res) {
    User.getWithParams(req.body, (err, result) => {
        if (err) {
            console.error("Lỗi:", err);
            return res.status(500).json({ error: "Lỗi ", details: err.message });
        }
        return res.json(result);
    });
}
export function update(req, res) {
    User.update(req.body, (err, result) => {
        if (err) {
            console.error("Lỗi:", err);
            return res.status(500).json({ error: "Lỗi ", details: err.message });
        }
        return res.json(result);
    });
}
export const logout = (req, res) => {
    res.cookie("shopvntt-user-token", "NONE", {
        httpOnly: true, // Không cho JavaScript truy cập
        secure: process.env.NODE_ENV === "production", // Chỉ bật secure nếu chạy HTTPS
        sameSite: "Strict", // Chống CSRF
        maxAge: 0 // Hết hạn sau 30 ngày
    });
    return res.json({ statusCode: 200, message: "Đăng xuất thành công" });
};
export const auth = (req, res) => {
    if (!req.user) {
        return res.status(400).json({ error: "Thiếu thông tin đăng nhập" });
    }
    User.login(req.user, (err, result) => {
        if (err) {
            console.error("Lỗi:", err);
            return res.status(500).json({ error: "Lỗi", details: err.message });
        }
        if (!result || !result.token) {
            return res.status(401).json({ error: "Đăng nhập thất bại" });
        }
        res.cookie("shopvntt-user-token", result.token, {
            httpOnly: true, // Không cho JavaScript truy cập
            secure: process.env.NODE_ENV === "production", // Chỉ bật secure nếu chạy HTTPS
            sameSite: "Strict", // Chống CSRF
            maxAge: 30 * 24 * 60 * 60 * 1000 // Hết hạn sau 30 ngày
        });
        return res.json({
            message: "Đăng nhập thành công",
            user: {
                username: result.user_name,
                email: result.email,
                premission: result.premission,
                phone: result.phone,
                permissions: result.permissions,
                address: result.address,
                createAt: result.create_at,
                consumerPoint: result.consumer_point,
                reputationPoint: result.reputation_point,
                userPoint: result.user_point,
            } // Không trả token
        });
    });
};
