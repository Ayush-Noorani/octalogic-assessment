const pool = require("./connect.js");

const createTableNoOfWheels = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS NoOfWheels (
      id SERIAL PRIMARY KEY,
      wheels INT NOT NULL
    );
  `;
  try {
    await pool.query(query);
    console.log("Number Of Wheels Table created successfully.");
  } catch (error) {
    console.error("Error creating table number of wheels:", error.stack);
  }
};

const createTableVehicleType = async () => {
  const query = `
      CREATE TABLE IF NOT EXISTS VehicleType (
        id SERIAL PRIMARY KEY,
        type VARCHAR(100) NOT NULL,
        wheelId INT,
        FOREIGN KEY (wheelId) REFERENCES NoOfWheels(id)
      );
    `;
  try {
    await pool.query(query);
    console.log("Vehicle Type Table created successfully.");
  } catch (error) {
    console.error("Error creating table vehicle type:", error.stack);
  }
};

const createTableVehicleModel = async () => {
  const query = `
        CREATE TABLE IF NOT EXISTS VehicleModel (
          id SERIAL PRIMARY KEY,
          model VARCHAR(100) NOT NULL,
          vehicleType INT,
          FOREIGN KEY (vehicleType) REFERENCES VehicleType(id)
        );
      `;
  try {
    await pool.query(query);
    console.log("Vehicle Model Table created successfully.");
  } catch (error) {
    console.error("Error creating table vehicle model:", error.stack);
  }
};

const createTableBookings = async () => {
  const query = `
        CREATE TABLE IF NOT EXISTS VehicleBookings (
          id SERIAL PRIMARY KEY,
          first_name VARCHAR(100) NOT NULL,
          last_name VARCHAR(100),
          model VARCHAR(100) NOT NULL,
          type VARCHAR(100) NOT NULL,
          fromdate DATE NOT NULL,
          todate DATE NOT NULL
        );
      `;
  try {
    await pool.query(query);
    console.log("Bookings Table created successfully.");
  } catch (error) {
    console.error("Error creating table bookings:", error.stack);
  }
};

const setupDB = async () => {
  try {
    await createTableNoOfWheels();
    await createTableVehicleType();
    await createTableVehicleModel();
    await createTableBookings();
    console.log("Tables created successfully");
  } catch (e) {
    console.log("Error creating tables: ", e);
  }
};

module.exports = setupDB;
