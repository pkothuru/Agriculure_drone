import React, { useEffect, useState } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import axios from "axios";
const Card = ({ Title, Service, ImageUrl, Farm, FarmLand, FlightDetails }) => {
  return (
    <div className="flex flex-1 gap-4 items-center p-4 rounded-lg shadow-md">
      <div className="relative w-[120px] h-[80px] rounded-lg">
        <Image
          className="rounded-full"
          src={ImageUrl}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="text-sm">
        <div className="font-semibold text-gray-600">
          <h1>{Title}</h1>
          <h2 className="mt-1">{Service}</h2>
        </div>
        <div className="text-gray-500 mt-2">
          <p>
            {Farm}: {FarmLand}
          </p>
          <p className="mt-2">
            {dayjs(FlightDetails.startDate).format("DD/MM/YYYY")} -{" "}
            {FlightDetails.duration} Days
          </p>
        </div>
      </div>
    </div>
  );
};
const PilotCard = ({
  name,
  pilotPhoneNumber,
  Service,
  ImageUrl,
  Farm,
  FarmLand,
  FlightDetails,
}) => {
  return (
    <div className="flex flex-1 gap-4 items-center p-4 rounded-lg shadow-md">
      <div className="relative w-[120px] h-[80px] rounded-lg">
        <Image
          className="rounded-full"
          src={ImageUrl}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="text-sm">
        <div className="font-semibold text-gray-600">
          <h1>{name}</h1>
          <h2 className="mt-1">Drone Pilot</h2>
        </div>
        <div className="text-gray-500 mt-2">
          <p>License #: FA123G4567</p>
          <p>Phone: {pilotPhoneNumber}</p>
          <p>Address: 2200 10th Street, Plano, TX 75074</p>
        </div>
      </div>
    </div>
  );
};

const SummaryCard = ({ price, FlightDetails }) => {
  const [total, setTotal] = useState(price + 10 * FlightDetails.duration + 50);
  return (
    <div className="bg-gray-300 p-10 rounded-lg text-sm font-semibold text-gray-700">
      <div className="flex gap-8">
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <p>
              <p>Drone base charge</p>
              <p className="font-normal text-xs mt-1">Base charge</p>
            </p>

            <p className="font-normal">${price}</p>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p>
              <p>Service duration</p>
              <p className="font-normal text-xs mt-1">
                {FlightDetails.duration} Day - On-Demand
              </p>
            </p>

            <p className="font-normal">x {FlightDetails.duration}</p>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p>
              <p>Hourly Service Operations Per Day</p>
              <p className="font-normal text-xs mt-1">
                1x Data Collection - Crop Health
              </p>
            </p>

            <p className="font-normal">$10</p>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p>
              <p>Hourly Flights Per Day</p>
              <p className="font-normal text-xs mt-1">
                {FlightDetails.duration} x 10:00 AM Flight
              </p>
            </p>

            <p className="font-normal">${FlightDetails.duration * 10}</p>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <p>
              <p>Equipment</p>
              <p className="font-normal text-xs mt-1">1 x Camera</p>
            </p>

            <p className="font-normal">$0</p>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p>
              <p>Materials</p>
              <p className="font-normal text-xs mt-1">(None)</p>
            </p>

            <p className="font-normal">$0</p>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p>
              <p>Shipping</p>
              <p className="font-normal text-xs mt-1">Deliver drone to farm</p>
            </p>

            <p className="font-normal">$20</p>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p>
              <p>Pilot Charge</p>
              <p className="font-normal text-xs mt-1">Drone setup and labor</p>
            </p>

            <p className="font-normal">$20</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <p>
          Payment: <span className="font-normal">Card ending with 1234</span>
        </p>
        <p className="mt-4 text-lg">
          Total Price: <span>${total}</span>
        </p>
      </div>
    </div>
  );
};
const StepFive = ({ farm, farmLand, selectedDrone, flightDetails }) => {
  const [pilot, setPilot] = useState({});
  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_HOST}api/pilot?pilotID=${flightDetails.pilotID}`
      )
      .then(({ data: message }) => {
        setPilot({
          ...pilot,
          pilotName: message.message.fullName,
          pilotPhoneNumber: message.message.phoneNumber,
        });
      });
  }, []);
  return (
    <div>
      <h1 className="font-semibold text-3xl text-[color:var(--primary)]">
        Step 5: Confirm Booking
      </h1>
      <p className="text-md text-gray-600 mt-4">
        Please confirm your selected service details Your estimated cost is
        below.
      </p>
      <h3 className="text-lg font-semibold text-[color:var(--primary)] my-6">
        Summary
      </h3>
      <div className="flex w-full gap-6">
        <Card
          Farm={farm}
          FarmLand={farmLand}
          ImageUrl={selectedDrone.imageUrl}
          Title={selectedDrone.title}
          Service={selectedDrone.service}
          FlightDetails={flightDetails}
        />

        <PilotCard
          ImageUrl={"/assets/pilot-1.jpg"}
          name={pilot.pilotName}
          pilotPhoneNumber={pilot.pilotPhoneNumber}
        />

        {/* <Card /> */}
      </div>
      <div className="my-6">
        <SummaryCard
          price={selectedDrone.price}
          FlightDetails={flightDetails}
        />
      </div>
    </div>
  );
};

export default StepFive;
