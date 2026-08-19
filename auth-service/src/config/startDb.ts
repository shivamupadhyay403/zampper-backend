import { pool } from "./database";

async function start() {
  try {
    const result = await pool.query("SELECT NOW()");

    console.log("Database connected!");
    console.log(result.rows[0]);

    await pool.end();
  } catch (error) {
    console.error("Database connection failed:", error);
  }
}

start();