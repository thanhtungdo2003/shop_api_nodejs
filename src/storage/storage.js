import multer from "multer";
import path from "path";
import fs from "fs";
import connection, { insert } from "./sqlservice";
import { dir } from "console";

// Cấu hình Multer
const multerStorage = (uploadPath) =>
    multer.diskStorage({
        destination: (req, file, cb) => {
            if (!fs.existsSync(uploadPath)) {
                fs.mkdirSync(uploadPath, { recursive: true }); // Tạo thư mục nếu chưa có
            }
            cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            const fileExt = path.extname(file.originalname); // Lấy đuôi file (.jpg, .png, ...)
            const fileName = `${Date.now()}${fileExt}`; // Đổi tên file theo timestamp
            if (!req.savedFileNames) req.savedFileNames = []; // Khởi tạo mảng nếu chưa có
            req.savedFileNames.push(fileName); // Lưu tên file vào mảng
            cb(null, fileName);
        },
    });

// Middleware upload nhiều ảnh
export const uploadImgs = (uploadPath) => {
    return (req, res, next) => {
        const upload = multer({ storage: multerStorage(uploadPath) }).array("images", 10); // Upload tối đa 10 ảnh
        upload(req, res, (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            req.files = req.savedFileNames; // Lưu danh sách file đã lưu
            next();
        });
    };
};

export function saveFilesToMySQL(files, id) {
    const values = files.map(file => `('${id}', '${file}')`).join(", ");
    const sql = `INSERT INTO product_images (product_id, filename) VALUES ${values};`;
    connection.query(sql, (err, result) => {
        if (err) throw err;
        console.log("Files inserted:", result.affectedRows);
    });
}

export function getFile(req, res) {
    const { filename, dirpath } = req.params;
    console.log(`[${Date.now().toLocaleString()}] `+ dirpath+" -> "+filename)
    const filePath = path.join("D:/shopmt/" + dirpath + "/", filename);
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: "File not found" });
    }
    res.sendFile(filePath);
}