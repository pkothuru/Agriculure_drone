import React from "react";
import DroneCard from "./DroneCard";
import dayjs from "dayjs";
const StepFour = ({
  selectedDrone,
  updateDetails,
  farm,
  farmLand,
  flightDetails,
}) => {
  return (
    <div>
      <h1 className="font-semibold text-3xl text-[color:var(--primary)]">
        Step 4: Selected Drone
      </h1>
      <p className="text-md text-gray-600 mt-4">This is your selected Drone</p>
      <div className="flex justify-between gap-8">
        <div className="mt-8 max-w-sm flex-1">
          <p className="mb-6 text-xl font-semibold text-[color:var(--primary)]">
            Drone Information
          </p>
          <DroneCard {...selectedDrone} />
        </div>
        <div className="mt-8 max-w-sm flex-1">
          <div>
            <p className="mb-6 text-xl font-semibold text-[color:var(--primary)]">
              Date & Time
            </p>
            <div>
              <p className="text-gray-700 font-semibold text-sm">
                Date:{" "}
                <span className="text-sm text-gray-500">
                  {dayjs(flightDetails.startDate).format("DD/MM/YYYY")}
                </span>
              </p>
              <p className="text-gray-700 font-semibold mt-3 text-sm">
                Duration:{" "}
                <span className="text-sm text-gray-500">
                  {flightDetails.duration} days
                </span>
              </p>
            </div>
          </div>
          <div className="mt-8">
            <p className="mb-6 text-xl font-semibold text-[color:var(--primary)]">
              Location
            </p>
            <div>
              <p className="text-gray-700 font-semibold text-sm">
                Farm: <span className="text-sm text-gray-500">{farm}</span>
              </p>
              <p className="text-gray-700 font-semibold mt-3 text-sm">
                Farm Land:{" "}
                <span className="text-sm text-gray-500">{farmLand}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepFour;
