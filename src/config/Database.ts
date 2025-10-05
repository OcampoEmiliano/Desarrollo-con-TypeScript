// src/config/Database.ts
import mysql from 'mysql2/promise';

class Database {
  private static instance: Database;
  private pool: mysql.Pool;

  private constructor() {
    this.pool = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'formotex',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public getConnection(): mysql.Pool {
    return this.pool;
  }
}

export default Database;