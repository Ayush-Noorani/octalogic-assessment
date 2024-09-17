const pool = require("../db/connect.js");

const confirmVehicleBooking = async (req, res) => {};

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

const checIfAvailableOnDate = (req, res) => {};

module.exports = {
  confirmVehicleBooking,
  getNoOfWheels,
  getVehileModel,
  getVehileType,
  checIfAvailableOnDate,
};
