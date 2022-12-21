import { Button } from "@mui/material";
import Image from "next/image";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import availability from "timeslot-availability";
import axios from "axios";
const drones = [
  {
    droneID: "1",
    title: "DJI Mini SE",
    service: "Data Collection",
    imageUrl: "/assets/drone-1.png",
    price: 100,
    brand: "DJI",
    equipment: "Thermal Camera",
    description: "3-Axis Gimbal",
    quality: "4K",
    flightSpeed: "13 m/s",
    weight: "1374 gms",
    flightParams: {
      flightTime: "30 minutes",
      maxSpeed: "P-mode:8 m/s",
      maxServiceCeiling: "6000 m",
      windResistance: "10 m/s",
    },
    cameraSpecs: {
      sensor: "1-inch CMOS",
      lens: "FOV 84° 8.8 mm/24 mm",
      operatingRange: "0-10 m",
      shutterSpeed: "8-1/2000 s",
    },
    imageSpecs: {
      imageResolution: "4K",
      videoResolution: "4K",
      recordingRate: "60 fps",
    },
    thermalSensingSpecs: {
      sensoryRange: "0.2m- 7m",
      fov: "70° Horiz, ±10° Vert",
      measuringFreq: "10 Hz",
    },
  },
  {
    droneID: "2",
    title: "DJI Matrice 300 RTK",
    service: "Surveillance",
    imageUrl: "/assets/drone-1.png",
    price: 180,
    brand: "DJI",
    equipment: "Thermal Camera",
    description: "3-Axis Gimbal",
    quality: "960p",
    flightSpeed: "17 m/s",
    weight: "9 kg",
    flightParams: {
      flightTime: "55 minutes",
      maxSpeed: "P-mode:8 m/s",
      maxServiceCeiling: "6000 m",
      windResistance: "10 m/s",
    },
    cameraSpecs: {
      sensor: "1-inch CMOS",
      lens: "FOV 84° 8.8 mm/24 mm",
      operatingRange: "0-10 m",
      shutterSpeed: "8-1/2000 s",
    },
    imageSpecs: {
      imageResolution: "4K",
      videoResolution: "4K",
      recordingRate: "60 fps",
    },
    thermalSensingSpecs: {
      sensoryRange: "0.2m- 7m",
      fov: "70° Horiz, ±10° Vert",
      measuringFreq: "10 Hz",
    },
  },
];
const DroneCard = ({
  droneID,
  title,
  service,
  description,
  quality,
  flightParams,
  flightSpeed,
  weight,
  imageUrl,
  price,
  updateFields,
  selectedID,
  setSelectedID,
  selectedDrone,
}) => {
  return (
    <div className="shadow-md rounded-xl p-5">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="font-semibold text-gray-700 mb-1">{title}</p>
          <p className="font-semibold text-sm text-gray-700 mb-2">{service}</p>
          <div className="text-sm text-gray-600">
            <p className="mb-[6px]">ID #{droneID}</p>
            <p className="mb-[6px]">{description}</p>
            <p className="mb-[6px]">{flightParams.flightTime}</p>
            <p className="mb-[6px]">{flightSpeed}</p>
            <p className="mb-[6px]">{weight}</p>
          </div>
        </div>
        <div className="">
          <div className="relative h-[69px] w-[143px]">
            <Image src={imageUrl} layout="fill" objectFit="cover" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-400 font-semibold">
          <span className="text-lg font-bold text-black">${price}</span> / hour
        </div>
        <div>
          <Button
            className={`${
              selectedID === droneID || selectedDrone.droneID === droneID
                ? "bg-green-500 hover:bg-green-600"
                : "bg-blue-500 hover:bg-blue-600"
            } border-none hover:border-none  text-white`}
            variant="outlined"
            // color="primary"
            onClick={() => {
              setSelectedID(droneID);
              updateFields({
                selectedDrone: drones.find(
                  (drone) => drone.droneID === droneID
                ),
              });
            }}
          >
            {selectedID === droneID || selectedDrone.droneID === droneID
              ? "Selected"
              : "Select"}
          </Button>
        </div>
      </div>
    </div>
  );
};
const DroneWrapper = ({ updateFields, selectedDrone, session }) => {
  // const [drones, setDrone] = useState(DRONES);
  // const [slots, setSlots] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get(`${process.env.NEXT_PUBLIC_HOST}api/pilot/slots?getAll=true`)
  //     .then((res) => {
  //       setSlots(res.data.message);
  //     });
  // }, []);
  // useEffect(() => {
  //   if (slots.length > 0) {
  //     const start = slotes;
  //     const end = new Date("2019-08-08T16:00:00.000Z");
  //     const timespan = 30 * 60; // 30 minutes
  //     const bookable = availability(start, end, timespan, slots);

  //     console.log(bookable, "BOOKABLE");
  //   }
  // }, [slots]);
  const [selectedID, setSelectedID] = useState("");
  return (
    <div className="grid grid-cols-2 gap-8">
      {drones.map((drone) => (
        <DroneCard
          selectedDrone={selectedDrone}
          selectedID={selectedID}
          setSelectedID={setSelectedID}
          key={drone.droneID}
          {...drone}
          updateFields={updateFields}
        />
      ))}
    </div>
  );
};
function StepTwo({ updateFields, selectedDrone, session }) {
  return (
    <div>
      <h1 className="font-semibold text-3xl text-[color:var(--primary)]">
        Step 2: Drone Catalog
      </h1>
      <p className="text-md text-gray-600 mt-4">
        Select a service and choose your drone
      </p>
      <div>
        <DroneWrapper
          session={session}
          selectedDrone={selectedDrone}
          updateFields={updateFields}
        />
      </div>
    </div>
  );
}

export default StepTwo;
