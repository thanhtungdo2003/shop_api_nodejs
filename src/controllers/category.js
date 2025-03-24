import { randomUUID } from 'crypto'
import Category from '../model/category';
export function getAll(req, res){
    Category.getAll((err, categorys)=>{
        if (err) {
            console.error("Lỗi:", err);
            return res.status(500).json({ error: "Lỗi ", details: err.message });
        }
        return res.json(categorys);
    });
}
export function getByPage(req, res){
    if (!req || !req.body){
        return res.status(500).json({ error: "Lỗi ", details: "Không có tham số" });
    }
    const {page, row} = req.body;
    Category.getByPage(page, row, (err, categorys)=>{
        if (err) {
            console.error("Lỗi:", err);
            return res.status(500).json({ error: "Lỗi ", details: err.message });
        }
        return res.json(categorys);
    });
}
export function create(req, res) {
    const data = req.body;
    // Kiểm tra category có tồn tại không
    if (!data || !data.category_name) {
        return res.status(400).json({ error: "Thiếu thông tin" });
    }
    data.category_id = randomUUID();
    Category.create(data, (err, result)=>{
        if (err) {
            console.error("Lỗi:", err);
            return res.status(500).json({ error: "Lỗi khi thêm danh mục", details: err.message });
        }
        return res.json({
            message: "Đã thêm danh mục",
            category_id: result,
            category_info: data
        });
    });
}