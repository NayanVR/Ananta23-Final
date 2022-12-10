const admin = require('../config/firebase-config');

class Middleware {
    async decodeToken(req, res, next) {
        if (!req.url.includes('/api/secure')) return next();

        try {
            const token = req.headers.authorization.split(' ')[1];
            const decodeValue = await admin.auth().verifyIdToken(token);
            if (decodeValue) {
                req.user = decodeValue;
                return next();
            }
            return res.status(401).json({ message: "Unauthorized" });
        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

module.exports = new Middleware();