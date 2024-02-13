const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const issueToken = (user) => {
    const payload = {
        id: user.id,
        expire: Date.now() + 1000 * 60 * 60 * 24 * 7,
    }
    return `${jsonwebtoken.sign(payload, process.env.JWT_SECRET)}`;
}
module.exports = { issueToken };