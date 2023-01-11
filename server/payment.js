const Paytm = require('paytmchecksum');
const { v4: uuidv4 } = require('uuid');

async function makePayment(req) {

    const totalAmount = req.body.amount;
    const email = req.body.email;

    let params = {};

    params['MID'] = process.env.PAYTM_MID
    params['WEBSITE'] = process.env.PAYTM_WEBSITE
    params['CHANNEL_ID'] = process.env.PAYTM_CHANNEL_ID
    params['INDUSTRY_TYPE_ID'] = process.env.PAYTM_INDUSTRY_TYPE_ID
    params['ORDER_ID'] = uuidv4()
    params['CUST_ID'] = process.env.PAYTM_CUST_ID
    params['TXN_AMOUNT'] = totalAmount
    params['CALLBACK_URL'] = `${process.env.SERVER_URL}/api/payment-callback`
    params['EMAIL'] = email
    params['MOBILE_NO'] = '7777777777'

    console.log(params);

    const paytmChecksum = await Paytm.generateSignature(params, process.env.PAYTM_MERCHANT_KEY);

    if (paytmChecksum) {
        return {
            code: 200,
            resMessage: {
                ...params,
                "CHECKSUMHASH": paytmChecksum
            }
        }
    } else {
        return {
            code: 500,
            resMessage: {
                message: "Something went wrong",
                type: "error"
            }
        }
    }
}

module.exports = {
    makePayment
}