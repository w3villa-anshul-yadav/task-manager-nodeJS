const jwt = require("jsonwebtoken");
const logger = require("../logger");

const validateToken = (req, res, next) => {
    try {
        let authorizationHeader =
            req.headers.authorization || req.headers.Authorization;

        if (authorizationHeader && authorizationHeader.startsWith("Bearer")) {
            const token = req.headers.authorization.split(" ")[1];

            jwt.verify(token, process.env.SECTRET_ACCESS_KEY, (err, decode) => {
                if (err) {
                    res.status(401);
                    throw new Error("User is Not Authorized");
                }

                req.user = decode.user;
            });

            next();
        } else {
            res.status(401);
            throw new Error("User is not Atuthorized or Token  is Missing");
        }
    } catch (error) {
        logger.error(error.toString());
        return res
            .status(500)
            .json({ status: false, message: error.toString() });
    }
};
module.exports = validateToken;
