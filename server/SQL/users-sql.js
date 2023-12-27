// var pool = require( '../SQL/pool-sql')

// module.exports = class UsersSQL {
//     static async sql(sqlStr,...params){
//         let [f] = (await pool.query(sqlStr, [params]));
//         return f;
//     }
//     static async create(user) {
//         return (await pool.query(`INSERT INTO users (name, email, password, status) VALUES (?, ?, ?, ?);`,
//         [user.name, user.email, user.password, "Active"]));
//     }
//     static async createAndReturn(user) {
//         let [f] = UsersSQL.create(user); 
//         return UsersSQL.searchById(f.insertId);
//     }
//     static async searchById(id) {
//         return (await pool.query(`
//         SELECT * FROM users WHERE id = ?`,[id]))[0][0];
//     }
    
//     static async searchByEmail(user) {
//         return (await pool.query(`
//         SELECT * FROM users WHERE email = ?`,[user.email]))[0][0];
//     }
//     static async getAll() {
//         return (await pool.query(`
//         SELECT * FROM users`))[0];
//     }
//     static async delete(user) {
//         return await UsersSQL.sql(`DELETE FROM users WHERE email = ?`, user.email);
//     }
//     static async updateLoginDate(user){ 
//         return (await pool.query(`
//         UPDATE users SET lastLoginDate = ? WHERE = ?`, [user.lastLoginDate, user.email]));      
//     }
//     static async updateStatus(user){ 
//         return (await pool.query(`
//         UPDATE users SET status = ? WHERE = ?`, [user.status, user.email]));     
//     }
// }
