import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
});

export const testDbConnection = async () => {
  try {
    await pool.query("SELECT NOW()");
    console.log("✅ Database connection is successful");
  } catch (error) {
    console.log("❌ Query failed", error);
  }
};

export default pool;
