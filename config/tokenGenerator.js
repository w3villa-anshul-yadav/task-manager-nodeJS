const TokenGenerator = require("token-generator")({
    salt: process.env.FORGET_PASSWORD_TOKEN_SECTET,
    timestampMap: "abcdefghij",
    expires: 600,
}); //for reset password

module.exports = TokenGenerator;
