import Order from "../model/order";

export function create(req, res) {
    Order.create(req.body, (err, result) => {
        if (err) {
            console.error("Lỗi:", err);
            return res.status(500).json({ error: "Lỗi ", details: err.message });
        }
        return res.json(result);
    });
}
export function getByParams(req, res) {
    Order.getByParams(req.body, (err, result) => {
        if (err) {
            console.log("Lỗi: " + err);
            return res.status(500).json({ error: "Lỗi ", details: err.message });
        }
        return res.json(result);
    })
}