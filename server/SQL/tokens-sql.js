// var pool = require( '../SQL/pool-sql')

// module.exports = class TokensSQL {
//     static async create(userId, token) {
//         return (await pool.query(`
//         INSERT INTO tokens (userId, token) VALUES (?, ?)`,[userId, token],
//         [userId, token]));
//     }
//     static async createAndReturn(userId, token) {
//         let [f] = TokensSQL.create(userId, token); 
//         return TokensSQL.searchByUserId(f.insertId);
//     }
//     static async deleteByToken(token) {
//         let [f] = await pool.query(`
//         DELETE FROM tokens WHERE token = ?`, [token]);
//         return f.affectedRows;
//      }
//     static async searchByToken(token) {
//         return (await pool.query(`
//         SELECT * FROM tokens WHERE token = ?`,[token]))[0][0];
//     }
//     static async searchByUserId(userId) {
//         return (await pool.query(`
//         SELECT * FROM tokens WHERE id = ?`,[userId]))[0][0];
//     }
// }
