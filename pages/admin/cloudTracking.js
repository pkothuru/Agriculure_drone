import React from "react";
import Layout from "../../layout/adminDashboardLayout";
import { getSession } from "next-auth/react";
import Image from "next/image";
const CloudTracking = ({ data }) => {
  // console.log(data, "DATA fetched");
  return (
    <div>
      <Layout>
        <div className="p-4">
          <h1 className="text-2xl font-semibold text-gray-700">
            Drone Tracking
          </h1>
          <p>Options</p>
          {/* Options */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Drone Status
            </h2>
            <div className="flex gap-4">
              <div className="flex items-center justify-center gap-1">
                <p className="w-3 h-3 rounded-full bg-green-700 inline-block"></p>
                <p>Active</p>
              </div>
              <div className="flex items-center justify-center gap-1">
                <p className="w-3 h-3 rounded-full bg-red-500 inline-block"></p>
                <p>Stopped</p>
              </div>
              <div className="flex items-center justify-center gap-1">
                <p className="w-3 h-3 rounded-full bg-yellow-500 inline-block"></p>
                <p>Connected, ready to service</p>
              </div>
              <div className="flex items-center justify-center gap-1">
                <p className="w-3 h-3 rounded-full bg-blue-700 inline-block"></p>
                <p>Registered, not Connected</p>
              </div>
            </div>
          </div>
          {/* Options end */}
          <p className="text-xl font-semibold text-gray-800 my-6">
            93 Drones Found
          </p>
          <div className="grid grid-cols-3 gap-4">
            {data.map((drone) => (
              <Drone key={drone.drone_id} drone={drone} />
            ))}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default CloudTracking;

const color = (status) => {
  if (status === "active || Active")
    return "text-green-500 border-green-500 border font-semibold bg-green-200";
  else if (status === "registered")
    return "text-purple-500 border-purple-500 border font-semibold bg-purple-200";
  else if (status === "stopped")
    return "text-red-500 border-red-500 border font-semibold bg-red-200";
  else if (status === "connected")
    return "text-yellow-500 border-yellow-500 border font-semibold bg-yellow-200";
  return "text-red-500";
};

const Drone = ({ drone }) => {
  return (
    <div className="p-5 border-purple-700 border grid grid-cols-3 items-center rounded-xl">
      <div className="">
        <p className="text-gray-400 text-sm">Drone ID#</p>
        <p className="text-gray-800 font-semibold">{drone.drone_id}</p>
        <p className="text-sm text-gray-700">{drone.drone_maker}</p>
      </div>
      <div className="relative h-full w-full">
        <Image src={"/assets/drone-2.png"} layout="fill" objectFit="contain" />
      </div>
      <div className="flex items-center justify-end">
        <p
          className={`text-center rounded-md p-1 inline-block ${color(
            drone.status
          )}`}
        >
          {drone.status}
        </p>
      </div>
    </div>
  );
};

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  } else {
    const res = await fetch(
      "http://ec2-52-203-10-77.compute-1.amazonaws.com/flight_data_collect/get-drones/"
    );

    const data = await res.json();

    return {
      props: { session, data },
    };
  }
}
