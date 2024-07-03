const jwt = require('jsonwebtoken');
const { errorHandler } = require('./errorHandler');


module.exports.verify = (req, res, next) => {
    try {
        const token = req.cookies.access_token;
        if (!token) {
            return next(errorHandler(401, "there is no token"));
        }

        jwt.verify(token, "secret", (err, decoded) => {
            if (err) {
                return next(errorHandler(401, err.message));
            }
            req.user=decoded;
            next()
        })

    } catch (error) {
        next(error)
    }
}