import React, { useEffect, useState } from "react";

const VehicleType = ({ Wheels, updateBookingInformation }) => {
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTypeSelection = (e) => {
    updateBookingInformation(e.target.name, e.target.value);
    setSelectedOption(e.target.value);
  };
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3001/getVehileType/${Wheels}`)
      .then((res) => res.json())
      .then((data) => {
        setVehicleTypes(data.data);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      <h2>Type of Vehicle</h2>
      {loading && <h3>Please wait ... </h3>}
      {!loading && (
        <>
          {vehicleTypes.length &&
            vehicleTypes.map((vehicle, index) => {
              return (
                <div key={index}>
                  <input
                    type="radio"
                    name="VehicleType"
                    value={vehicle.type}
                    checked={selectedOption == vehicle.type}
                    onChange={handleTypeSelection}
                  />
                  <label>{vehicle.type}</label>
                </div>
              );
            })}
        </>
      )}
    </div>
  );
};

export default VehicleType;
