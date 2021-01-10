const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:postgres:postgres@localhost:5432/socialnetworkdb`
);

module.exports.registerUser = (first, last, email, hashedPassword) => {
    const q = `INSERT INTO users (first, last, email, password)
    VALUES ($1, $2, $3, $4) RETURNING id`;
    const params = [first, last, email, hashedPassword];
    return db.query(q, params);
};

module.exports.checkForUserEmail = (email) => {
    return db.query("SELECT password, id FROM users WHERE email = $1", [email]);
};

module.exports.verifyEmail = (email) => {
    return db.query(`SELECT email, id FROM users WHERE email = ($1)`, [email]);
};

module.exports.addResetCode = (email, code) => {
    return db.query("INSERT INTO codes (email, code) VALUES ($1, $2)", [
        email,
        code,
    ]);
};

module.exports.verifyResetCode = () => {
    return db.query(
        `SELECT code FROM codes
WHERE CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes';`
    );
};

module.exports.updatePassword = (email, password) => {
    return db.query(`UPDATE users SET password = $1 WHERE email = $2`, [
        password,
        email,
    ]);
};
