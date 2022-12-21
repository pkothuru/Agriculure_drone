import { Button } from "@mui/material";
import Image from "next/image";
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
        <div></div>
      </div>
    </div>
  );
};

export default DroneCard;
