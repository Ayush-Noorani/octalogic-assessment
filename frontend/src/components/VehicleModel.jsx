import React, { useEffect, useState } from "react";

const VehicleModel = ({ VehicleType, updateBookingInformation }) => {
  const [vehicleModels, setVehicleModels] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  const handleModelSelection = (e) => {
    updateBookingInformation(e.target.name, e.target.value);
    setSelectedOption(e.target.value);
  };
  useEffect(() => {
    fetch(`http://localhost:3001/getVehileModel/${VehicleType}`)
      .then((res) => res.json())
      .then((data) => setVehicleModels(data.data));
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      {vehicleModels.length &&
        vehicleModels.map((vehicle, index) => {
          return (
            <div key={index}>
              <input
                type="radio"
                name="VehicleModel"
                value={vehicle.model}
                checked={selectedOption == vehicle.model}
                onChange={handleModelSelection}
              />
              <label>{vehicle.model}</label>
            </div>
          );
        })}
    </div>
  );
};

export default VehicleModel;
