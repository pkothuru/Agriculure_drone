import { Button } from "@mui/material";
import React from "react";
import Link from "next/link";
import Layout from "../../../layout/navbarLayout";
import PilotDashBoardWelcome from "../../DashBoardWelcome";
const UtilButton = ({ text, url }) => {
  return (
    <Link href={url} className="cursor-pointer">
      <div className=" cursor-pointer w-full py-3 bg-[color:var(--primary)] flex justify-center items-center text-white rounded-lg">
        {text}
      </div>
    </Link>
  );
};
const PilotDashboard = ({ user }) => {
  return (
    <Layout>
      <PilotDashBoardWelcome
        user={user}
        text={"Please select an option to continue."}
        url={user.image}
      />
      <div className="w-3/4 m-auto max-w-4xl flex justify-between items-start gap-8">
        <div className="flex-1 flex flex-col gap-10">
          <UtilButton text={"View Schedule"} url="/dashboard/pilot/schedule" />
          <UtilButton text={"View Bookings"} url="/dashboard/pilot/schedule" />
          <UtilButton text={"Edit Profile"} url="/dashboard/pilot/schedule" />
        </div>
        <div className="flex-1">Upcoming</div>
      </div>
    </Layout>
  );
};

export default PilotDashboard;
