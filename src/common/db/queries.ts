export const CREEATE_USERS_TABLE_QUERY = 'CREATE TABLE IF NOT EXISTS users1 (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, position TEXT, skype TEXT, phone TEXT, password TEXT, avatar TEXT)';
export const UPDATE_USER_QUERY = `UPDATE users1 SET name = ?, email = ?, phone = ?, position = ?, skype = ?, avatar = ? WHERE email = ?`;
export const GET_USER_QUERY = 'SELECT * FROM users1 WHERE email = ?';
export const SET_USER_QUERY = 'INSERT INTO users1 (name, email, phone, password) VALUES (?, ?, ?, ?)';
