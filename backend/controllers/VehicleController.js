const pool = require("../db/connect.js");

const confirmVehicleBooking = async (req, res) => {
  const userForm = req.body;
  const insertBookingQuery = `INSERT INTO vehiclebookings (first_name, last_name, model, type, fromdate, todate) VALUES ($1, $2, $3, $4, $5, $6);`;
  const insertBookingResult = await pool.query(insertBookingQuery, [
    userForm.FirstName,
    userForm.LastName,
    userForm.VehicleModel,
    userForm.VehicleType,
    userForm.FromDate,
    userForm.ToDate,
  ]);

  if (insertBookingResult.rows.length === 0) {
    res.status(200).json({ data: "Booking Successful" });
  } else {
    res.status(400).json({ data: "Booking Failed" });
  }
};

const getNoOfWheels = async (req, res) => {
  try {
    const result = await pool.query(`SELECT wheels FROM noofwheels;`);
    res.status(200).json({ data: result.rows });
  } catch (err) {
    console.log(err);
  }
};

const getVehileType = async (req, res) => {
  const wheels = req.params.wheels;
  const getNoOfVehileIdQuery = "SELECT id FROM noofwheels WHERE wheels = $1";
  const getVehilceTypeQuery = "SELECT type from vehicletype WHERE wheelid = $1";
  try {
    const wheelidresult = await pool.query(getNoOfVehileIdQuery, [wheels]);
    const wheelid = wheelidresult.rows;

    const vehiletypesResult = await pool.query(getVehilceTypeQuery, [
      wheelid[0].id,
    ]);
    res.status(200).json({ data: vehiletypesResult.rows });
  } catch (err) {
    console.log(err);
  }
};

const getVehileModel = async (req, res) => {
  const type = req.params.type;
  const getVehicleTypeIdQuery = "SELECT id FROM vehicletype WHERE type = $1";
  const getVehilceModelQuery =
    "SELECT model from vehiclemodel WHERE vehicletype = $1";
  try {
    const vehicletypeidresult = await pool.query(getVehicleTypeIdQuery, [type]);
    const vehicleid = vehicletypeidresult.rows;

    const vehilemodelResult = await pool.query(getVehilceModelQuery, [
      vehicleid[0].id,
    ]);
    res.status(200).json({ data: vehilemodelResult.rows });
  } catch (err) {
    console.log(err);
  }
};

const checIfAvailableOnDate = async (req, res) => {
  const fromDate = req.query.from;
  const toDate = req.query.to;
  const vehiclemodel = req.query.model;
  const vehicletype = req.query.type;

  const getVehicleModelAvailabilityQuery =
    "SELECT * FROM vehiclebookings WHERE model = $1 AND type = $2 AND ( fromDate <= $3 AND toDate >= $4 );";

  try {
    const getVehicleModelAvailabilityResult = await pool.query(
      getVehicleModelAvailabilityQuery,
      [vehiclemodel, vehicletype, fromDate, toDate]
    );
    res.status(200).json({ data: getVehicleModelAvailabilityResult.rows });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  confirmVehicleBooking,
  getNoOfWheels,
  getVehileModel,
  getVehileType,
  checIfAvailableOnDate,
};
