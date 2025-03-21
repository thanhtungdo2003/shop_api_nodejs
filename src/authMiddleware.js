import jwt from "jsonwebtoken";
import User from "./model/user";

const authMiddleware = (req, res, next) => {
    let token = req.headers.authorization?.split(" ")[1]; // Bearer token
    if (!token) {
        token = req.cookies["shopvntt-user-token"]; // Lấy token từ cookie nếu không có trong header
    }
    if (!token) {
        return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    try {
        const secretKey = process.env.SECRET_KEY;
        const decoded = jwt.verify(token, secretKey); // Xác thực token

        req.user = decoded; // Lưu thông tin user vào request
        next(); // Cho phép request tiếp tục
    } catch (error) {
        return res.status(403).json({ message: "Forbidden - Invalid token" });
    }
};
export const adminAuthMiddleware = (req, res, next) => {
    let token = req.headers.authorization?.split(" ")[1]; // Bearer token
    if (!token) {
        token = req.cookies["shopvntt-user-token"]; // Lấy token từ cookie nếu không có trong header
    }
    if (!token) {
        return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    try {
        const secretKey = process.env.SECRET_KEY;
        const decoded = jwt.verify(token, secretKey); // Xác thực token
        User.hasPermission(decoded.userName, "op", (err, result) => {
            if (err) res.status(403).json({ message: "Forbidden - Invalid token" });
            if (result === 1) {
                req.user = decoded; // Lưu thông tin user vào request
                next(); // Cho phép request tiếp tục
            }
        })
    } catch (error) {
        return res.status(403).json({ message: "Forbidden - Invalid token" });
    }
};


export const userAuthMiddleware = (req, res, next) => {
    let token = req.headers.authorization?.split(" ")[1]; // Bearer token
    if (!token) {
        token = req.cookies["shopvntt-user-token"]; // Lấy token từ cookie nếu không có trong header
    }
    if (!token) {
        return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    try {
        const secretKey = process.env.SECRET_KEY;
        const decoded = jwt.verify(token, secretKey); // Xác thực token
        User.hasPermission(decoded.userName, "op", (err, result) => {
            if (err) res.status(403).json({ message: "Forbidden - Invalid token" });
            if (result === 1) {
                req.user = decoded; // Lưu thông tin user vào request
                next(); // Cho phép request tiếp tục
            } else {
                User.getWithParams({
                    row: 1,
                    page: 1,
                    keyword: "",
                    username: req.body.username
                }, (err, result) => {
                    if (err) res.status(403).json({ message: "Lỗi khi truy xuất tài khoản để so sánh" });
                    if (result.user_name === req.body.keyword) {
                        req.user = decoded; // Lưu thông tin user vào request
                        next(); // Cho phép request tiếp tục
                    }
                })
            }
        })
    } catch (error) {
        return res.status(403).json({ message: "Forbidden - Invalid token" });
    }
};


export default authMiddleware;
