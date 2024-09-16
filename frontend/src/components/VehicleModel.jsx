import React from "react";

const VehicleModel = () => {
  const vehicle = ["i20", "BMW", "Fortuner"];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      {vehicle.map((vehicle, index) => {
        return (
          <div key={index}>
            <input
              type="radio"
              name={vehicle}
              value={vehicle}
              checked={index == 0 ? true : false}
            />
            <label>{vehicle}</label>
          </div>
        );
      })}
    </div>
  );
};

export default VehicleModel;
