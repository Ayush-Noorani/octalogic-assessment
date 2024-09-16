import React from "react";

const Name = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <h2>First, What's Your Name ?</h2>
      <div style={{ display: "flex", flexDirection: "column", width: "10%" }}>
        <label>First Name</label>
        <input type="text" name="name" required autoFocus />
      </div>
      <div style={{ display: "flex", flexDirection: "column", width: "10%" }}>
        <label>Last Name</label>
        <input type="text" name="last_name" required />
      </div>
    </div>
  );
};

export default Name;
