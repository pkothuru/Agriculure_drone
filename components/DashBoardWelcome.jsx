import Image from "next/image";
import React from "react";

const FarmerDashBoardWelcome = ({ user, text, url }) => {
  return (
    <div className="flex mt-4 justify-between items-center">
      <section>
        <p className="text-3xl font-semibold text-[color:var(--primary)]">
          Welcome, {user.name}!
        </p>
        <p className="text-md text-gray-500 mt-3">
          {text
            ? "Please select an option to continue."
            : "Check the status of your drone service bookings here."}
        </p>
      </section>
      <div className="relative w-[100px] h-[100px] rounded-full">
        <Image
          className="rounded-full"
          src={url ? url : `/assets/farmer.png`}
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  );
};

export default FarmerDashBoardWelcome;
