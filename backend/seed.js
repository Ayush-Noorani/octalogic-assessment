const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
  port: 5432,
});

const seedData = async () => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const noofwheelsResult = await client.query(`
        INSERT INTO noofwheels (wheels)
        VALUES 
          (2),
          (4)
        RETURNING id;
      `);

    const noofwheelsIds = noofwheelsResult.rows.map((row) => row.id);

    const vehiletypeResult = await client.query(`
        INSERT INTO vehicletype (type, wheelid)
        VALUES
          ('Sedan', ${noofwheelsIds[1]}),
          ('SUV', ${noofwheelsIds[1]}),
          ('Hatchback', ${noofwheelsIds[1]}),
          ('Sports', ${noofwheelsIds[0]}),
          ('Cruiser', ${noofwheelsIds[0]})
          RETURNING id;
        `);

    const vehicletypeIds = vehiletypeResult.rows.map((row) => row.id);

    await client.query(`
        INSERT INTO vehiclemodel (model, vehicletype)
        VALUES
          ('i20', ${vehicletypeIds[2]}),
          ('Thar', ${vehicletypeIds[1]}),
          ('Slavia', ${vehicletypeIds[0]}),
          ('S1000RR', ${vehicletypeIds[3]}),
          ('Harley883Iron', ${vehicletypeIds[4]});
        `);
    await client.query("COMMIT");

    console.log("Seeding completed successfully!");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error while seeding the database:", err);
  } finally {
    pool.end();
  }
};

seedData();
