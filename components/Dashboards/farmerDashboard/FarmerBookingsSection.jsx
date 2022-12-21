import React from "react";
import FarmerTable from "./FarmerTable";
const FarmerBookingsSection = ({ user }) => {
  return (
    <div className="mt-6">
      <FarmerTable user={user} />
    </div>
  );
};

export default FarmerBookingsSection;
