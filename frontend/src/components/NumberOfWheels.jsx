import React from "react";

const NumberOfWheels = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <h2>What Your Preference ?</h2>
      <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
        <input type="radio" name="2Wheels" value="2-Wheels" checked />
        <label>2 Wheeler</label>
      </div>
      <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
        <input type="radio" name="4Wheels" value="4-Wheels" />
        <label>4 Wheeler</label>
      </div>
    </div>
  );
};

export default NumberOfWheels;
