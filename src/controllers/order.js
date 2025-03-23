import Order from "../model/order";
import { randomUUID } from "crypto";
import crypto from "crypto"
import https from "https"

export function create(req, res) {
    const newUid = randomUUID();

    Order.create(newUid, req.body, (err, result) => {

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

export function updateStatus(req, res) {
    const { status, orderId } = req.body;
    Order.updateStatus(orderId, status, (err, result) => {
        if (err) {
            console.log("Lỗi: " + err);
            return res.status(500).json({ error: "Lỗi ", details: err.message });
        }
        return res.json(result);
    })
}
export function momoPay(reqClient, resClient) {
    const newUid = randomUUID();

    Order.create(newUid, reqClient.body, (createErr, createResult) => {
        if (createErr) {
            console.error("Lỗi:", createErr);
            return res.status(500).json({ error: "Lỗi ", details: createErr.message });
        }

        Order.getByParams({ page: 1, row: 1, keyword: newUid, sort: "newest" }, (getErr, getResult) => {
            if (getErr) {
                console.error("Lỗi:", getErr);
                return res.status(500).json({ error: "Lỗi ", details: getErr.message });
            }
            var accessKey = 'F8BBA842ECF85';
            var secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
            var orderInfo = 'pay with MoMo';
            var partnerCode = 'MOMO';
            var redirectUrl = 'http://localhost:4000/shopvntt_fe/momo-success/'+newUid; //Đường dẫn xác nhận thanh toán
            var ipnUrl = 'http://localhost:4000/shopvntt_fe/momo-success/';
            var requestType = "payWithMethod";
            var amount = Number(getResult[0].totalPrice);
            var orderId = partnerCode + new Date().getTime();
            var requestId = orderId;
            var extraData = '';
            var orderGroupId = '';
            var autoCapture = true;
            var lang = 'vi';
            //before sign HMAC SHA256 with format
            //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
            var rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" + requestType;
            //puts raw signature
            console.log("--------------------RAW SIGNATURE----------------")
            console.log(rawSignature)
            //signature
            var signature = crypto.createHmac('sha256', secretKey)
                .update(rawSignature)
                .digest('hex');
            console.log("--------------------SIGNATURE----------------")
            console.log(signature)

            //json object send to MoMo endpoint
            const requestBody = JSON.stringify({
                partnerCode: partnerCode,
                partnerName: "Test",
                storeId: "Shop",
                requestId: requestId,
                amount: amount,
                orderId: orderId,
                orderInfo: orderInfo,
                redirectUrl: redirectUrl,
                ipnUrl: ipnUrl,
                lang: lang,
                requestType: requestType,
                autoCapture: autoCapture,
                extraData: extraData,
                orderGroupId: orderGroupId,
                signature: signature
            });
            //Create the HTTPS objects
            const options = {
                hostname: 'test-payment.momo.vn',
                port: 443,
                path: '/v2/gateway/api/create',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(requestBody)
                }
            }
            //Send the request and get the response
            const req = https.request(options, res => {
                console.log(`Status: ${res.statusCode}`);
                console.log(`Headers: ${JSON.stringify(res.headers)}`);
                res.setEncoding('utf8');
                res.on('data', (body) => {
                    console.log('Body: ');
                    console.log(body);
                    console.log('resultCode: ');
                    console.log(JSON.parse(body).resultCode);

                    resClient.json(JSON.parse(body));
                });
                res.on('end', () => {
                    console.log('No more data in response.');
                });
            })

            req.on('error', (e) => {
                console.log(`problem with request: ${e.message}`);
            });
            // write data to request body
            console.log("Sending....")
            req.write(requestBody);
            req.end();
        })

    });


}