const bcrypt = require("bcrypt");

const hashPassword = async (pwd) => {
    const saltRounds = 10;
    return await bcrypt.hash(pwd, saltRounds);
};

const comparePassword = async (pwd, hashedPassword) => {
    return await bcrypt.compare(pwd, hashedPassword);
};

module.exports = {
    hashPassword,
    comparePassword,
};