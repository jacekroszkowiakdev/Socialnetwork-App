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
        `SELECT code FROM codes WHERE CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes';`
    );
};

module.exports.updatePassword = (email, password) => {
    return db.query(`UPDATE users SET password = $1 WHERE email = $2`, [
        password,
        email,
    ]);
};

module.exports.getProfileInfo = (id) => {
    return db.query(`SELECT * FROM users WHERE id = $1`, [id]);
};

module.exports.uploadProfilePic = (url, userId) => {
    return db.query(`UPDATE users SET profile_pic = $1 WHERE id = $2`, [
        url,
        userId,
    ]);
};

module.exports.updateBio = (bio, userId) => {
    return db.query(`UPDATE users SET bio = $1 WHERE id =$2 RETURNING bio`, [
        bio,
        userId,
    ]);
};

module.exports.getOtherProfile = (userId) => {
    return db.query(
        `SELECT first, last, profile_pic, bio FROM users WHERE id = $1`,
        [userId]
    );
};

module.exports.getLatestUsers = () => {
    return db.query(
        `SELECT id, first, last, profile_pic FROM users ORDER BY id DESC LIMIT 3`
    );
};

module.exports.searchUsers = (userQuery) => {
    return db.query(
        `SELECT id, first, last, profile_pic FROM users WHERE first ILIKE $1 OR last ILIKE $1 ORDER BY id DESC`,
        [userQuery + "%"]
    );
};

module.exports.getFriendStatus = (userId, otherUserId) => {
    return db.query(
        `SELECT * FROM friendships WHERE (sender_id =$1 AND recipient_id = $2) OR (sender_id = $2 AND recipient_id = $1)`,
        [userId, otherUserId]
    );
};

module.exports.acceptFriendship = (userId, otherUserId) => {
    return db.query(
        `UPDATE friendships SET accepted = true WHERE recipient_id = $1 AND sender_id = $2 RETURNING accepted`,
        [userId, otherUserId]
    );
};

module.exports.rejectFriendship = (userId, otherUserId) => {
    return db.query(
        `DELETE FROM friendships WHERE (sender_id =$1 AND recipient_id = $2) OR (sender_id = $2 AND recipient_id = $1)`,
        [userId, otherUserId]
    );
};

module.exports.sendFriendshipRequest = (userId, otherUserId) => {
    return db.query(
        `INSERT INTO friendships (sender_id, recipient_id) VALUES ($1, $2) RETURNING *`,
        [userId, otherUserId]
    );
};
