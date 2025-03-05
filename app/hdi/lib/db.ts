import sqlite3 from 'sqlite3';



export async function getDB() {
  let db: sqlite3.Database | null = null;

  // Open the database
  db = await new Promise<sqlite3.Database>((resolve, reject) => {
    const database = new sqlite3.Database('./hdi-names.db', (err) => {
      if (err) reject(err);
      else resolve(database);
    });
  });

  // create database if it doesn't exist
  if (!fs.existsSync('./hdi-names.db')) {

    if (!db) {
      // Create the table if it doesn't exist
      await new Promise<void>((resolve, reject) => {
        db!.run(`
      CREATE TABLE IF NOT EXISTS hdi_names (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    }

    // Check if table is empty
    const row: any = await new Promise((resolve, reject) => {
      db!.get('SELECT COUNT(*) as count FROM hdi_names', (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });

    if (row && row.count === 0) {
      // Insert initial data if the table is empty
      await new Promise<void>((resolve, reject) => {
        db!.run(`
        INSERT INTO hdi_names (name) VALUES 
        ('Human Digital Interface'),
        ('Higher Defiance Institute'),
        ('Hyperconsciousness Design Initiative'),
        ('Heart Data Integrated')
      `, (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    }

    return db;
  }

  // Helper function to execute queries with async/await
  export async function query<T>(sql: string, params: any[] = []): Promise<T[]> {
    const database = await getDB();
    return new Promise<T[]>((resolve, reject) => {
      database.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows as T[]);
      });
    });
  }

  // Helper function for single row queries
  export async function queryOne<T>(sql: string, params: any[] = []): Promise<T | null> {
    const database = await getDB();
    return new Promise<T | null>((resolve, reject) => {
      database.get(sql, params, (err, row) => {
        if (err) reject(err);
        else resolve(row as T | null);
      });
    });
  }

  // Helper function for executing commands (insert, update, delete)
  export async function execute(sql: string, params: any[] = []): Promise<void> {
    const database = await getDB();
    return new Promise<void>((resolve, reject) => {
      database.run(sql, params, function (err) {
        if (err) reject(err);
        else resolve();
      });
    });
  }
