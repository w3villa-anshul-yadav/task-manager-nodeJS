const jwt = require('jsonwebtoken');



//utility function
const generateToken = (user) => {
    try {
        const token = jwt.sign(
            {
                user: {
                    email: user.email,
                    name: user.name,
                    id: user.id,
                    phoneNumber: user.phoneNumber,
                },
            },
            process.env.SECTRET_ACCESS_KEY,
            { expiresIn: '10m' }
        );
        return token;
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = generateToken;
