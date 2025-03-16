import Product from "../model/product";
import { randomUUID } from "crypto";
import { saveFilesToMySQL, up } from "../storage/storage";

const generateProductId = () => {
    return randomUUID(); // Tạo UID chuẩn
};
//API sản phẩm
export const getProducts = async (req, res) => {
    Product.getAll((err, products) => {
        if (err) console.error("Lỗi:", err);
        res.json(products);
    });
};
export const getProductById = (req, res) => {
    Product.getById(req.params.id, (err, product) => {
        if (err) console.error("Lỗi:", err);
        res.json(product);
    });
};
export const getProductByParams = (req, res) => {
    Product.getByParams(req.body, (err, products) => {
        if (err) console.error("Lỗi:", err);
        res.json(products);
    });
};

export const getNews = (req, res) => {
    const {row, page} = req.params;
    Product.getNews(row, page, (err, products) => {
        if (err) console.error("Lỗi:", err);
        res.json(products);
    });
};
export const addProduct = async (req, res) => {
    try {
        const product = JSON.parse(JSON.stringify(req.body));
        const productImage = req.files;
        // Kiểm tra dữ liệu đầu vào
        if (!product.display_name || !product.price || !product.product_id || !product.category_id || !productImage) {
            return res.status(400).json({ error: "Thiếu thông tin sản phẩm" });
        }

        // Tạo product_id
        product.product_id = generateProductId();

        // Thêm sản phẩm vào database
        Product.create(product, (err, returnID) => {
            if (err) {
                console.error("Lỗi:", err);
                return res.status(500).json({ error: "Lỗi khi thêm sản phẩm", details: err.message });
            }
            saveFilesToMySQL(req.files, product.product_id);

            return res.json({
                message: "Đã thêm sản phẩm",
                product_id: returnID,
                product_info: product
            });
            
        });
    } catch (error) {
        console.error("Lỗi addProduct:", error);
        res.status(500).json({ error: "Lỗi khi xử lý sản phẩm", details: error.message });
    }
};


export const deleteProduct = (req, res) => {
    const { id } = req.params;
    Product.delete(id, (err, result) => {
        if (err) console.error("Lỗi:", err);
        res.status(200).json({
            "message": "xóa thành công",
            "excuse_result": result
        });
    });

};
export const updateProduct = (req, res) => {
    console.log('updateProduct')
};