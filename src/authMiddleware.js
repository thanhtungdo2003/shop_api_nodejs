import jwt from "jsonwebtoken";

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

export default authMiddleware;
