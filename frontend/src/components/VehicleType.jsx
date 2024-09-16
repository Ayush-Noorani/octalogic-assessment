import React from "react";

const VehicleType = () => {
  const bikes = ["sports", "cruiser"];
  const cars = ["sedan", "hatchback", "suv"];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      {cars.map((vehicle, index) => {
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

export default VehicleType;
