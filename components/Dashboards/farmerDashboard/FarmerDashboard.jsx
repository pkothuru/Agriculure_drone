import React from "react";
import Layout from "../../../layout/farmerDashboardLayout";
import FarmerDashBoardWelcome from "../../DashBoardWelcome";
import FarmerBookingsSection from "./FarmerBookingsSection";
const FarmerDashboard = ({ user }) => {
  return (
    <Layout>
      <div className="w-[75%] m-auto">
        <FarmerDashBoardWelcome user={user} url={user.image} />
        <FarmerBookingsSection user={user} />
      </div>
    </Layout>
  );
};

export default FarmerDashboard;
