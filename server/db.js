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

module.exports.verifySecret = (email, code, created_at) => {
    return db.query(`SELECT * FROM codes
WHERE CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes';`);
};
