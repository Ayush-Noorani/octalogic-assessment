import { Pool } from "pg";

const pool = new Pool({
  user: "root",
  host: "localhost",
  password: "root",
  database: "vehicle",
  port: 5432,
});

export default pool;
