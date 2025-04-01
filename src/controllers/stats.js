import Stats from "../model/stats";

export const getRevenueByRangeOfTime = (req, res) => {
    const { start, end } = req.body;
    if (!start || !end) {
        return res.status(400).json("Thiếu tham số thời gian!");
    }
    Stats.getRevenueByRangeOfTime(start, end, (err, result) => {
        if (err) {
            return res.status(400).json("Lỗi khi thống kê: " + err);
        }
        res.json(result);
    });
}


export const getUserRegByRangeOfTime = (req, res) => {
    const { start, end } = req.body;
    if (!start || !end) {
        return res.status(400).json("Thiếu tham số thời gian!");
    }
    Stats.getUserRegByRangeOfTime(start, end, (err, result) => {
        if (err) {
            return res.status(400).json("Lỗi khi thống kê: " + err);
        }
        res.json(result);
    });
}

export const getAmountOfProductSaleByRangeOfTime = (req, res) => {
    const { start, end, sortType } = req.body;
    if (!start || !end || !sortType) {
        return res.status(400).json("Thiếu tham số");
    }
    Stats.getAmountOfProductSaleByRangeOfTime(start, end, sortType, (err, result) => {
    if (err) {
        return res.status(400).json("Lỗi khi thống kê: " + err);
    }
    res.json(result);
});
}