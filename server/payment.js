const Paytm = require('paytmchecksum');
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');

function makePayment(req) {

    var totalAmount = req.body.amount;
    var email = req.body.email;

    var paytmParams = {};

    params['MID'] = process.env.PAYTM_MID
    params['WEBSITE'] = process.env.PAYTM_WEBSITE
    params['CHANNEL_ID'] = process.env.PAYTM_CHANNEL_ID
    params['INDUSTRY_TYPE_ID'] = process.env.PAYTM_INDUSTRY_TYPE_ID
    params['ORDER_ID'] = uuidv4()
    params['CUST_ID'] = process.env.PAYTM_CUST_ID
    params['TXN_AMOUNT'] = totalAmount
    params['CALLBACK_URL'] = 'http://localhost:5000/api/callback'
    params['EMAIL'] = email
    params['MOBILE_NO'] = '9876543210'

    var paytmChecksum = PaytmChecksum.generateSignature(paytmParams, process.env.PAYTM_MERCHANT_KEY);
    paytmChecksum.then(function (checksum) {
        return {
            ...params,
            "CHECKSUMHASH": checksum
        }
    }).catch(function (error) {
        console.log(error);
    });
}

module.exports = {
    makePayment
}