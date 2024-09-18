import React, { useEffect, useState } from "react";

const VehicleModel = ({ VehicleType, updateBookingInformation }) => {
  const [vehicleModels, setVehicleModels] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [loading, setLoading] = useState(false);

  const handleModelSelection = (e) => {
    updateBookingInformation(e.target.name, e.target.value);
    setSelectedOption(e.target.value);
  };
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3001/getVehileModel/${VehicleType}`)
      .then((res) => res.json())
      .then((data) => {
        setVehicleModels(data.data);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      {loading && <h3>Please wait ... </h3>}
      {!loading && (
        <>
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
        </>
      )}
    </div>
  );
};

export default VehicleModel;
