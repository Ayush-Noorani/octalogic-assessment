import React from "react";

const Name = ({ updateBookingInformation }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <h2>First, What's Your Name ?</h2>
      <div style={{ display: "flex", flexDirection: "column", width: "10%" }}>
        <label>First Name</label>
        <input
          type="text"
          name="FirstName"
          required
          autoFocus
          onChange={(e) =>
            updateBookingInformation(e.target.name, e.target.value)
          }
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", width: "10%" }}>
        <label>Last Name</label>
        <input
          type="text"
          name="LastName"
          required
          onChange={(e) =>
            updateBookingInformation(e.target.name, e.target.value)
          }
        />
      </div>
    </div>
  );
};

export default Name;
