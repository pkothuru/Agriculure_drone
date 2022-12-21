import { useState } from "react";
import Layout from "../layout/navbarLayout";
import Navbar from "./Navbar";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
const RoleSelection = ({ session, data }) => {
  const router = useRouter();
  const [role, setRole] = useState("");
  const handleOnSubmit = async ({}) => {
    if (role != "") {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/api/user/update`,
        {
          email: session.user.email,
          role: role,
        }
      );
      if (res.data.success) {
        router.push(`/${role}`);
      }
    }
  };
  return (
    <Layout>
      <div className="">
        <h2 className="text-3xl font-semibold primary">
          Welcome! Let&apos;s finish your registration
        </h2>
        <div className="flex items-center flex-col mt-10">
          <h3 className="text-2xl primary font-semibold">
            Select role to register as {role === "pilot" ? `${role} ` : role}
          </h3>
          <div className="flex items-center mt-12 gap-8">
            <div className="flex flex-col items-center ">
              <div
                onClick={() => setRole("farmer")}
                className={`w-[280px] h-[280px] rounded-full relative ${
                  role === "farmer"
                    ? "border-3 border-[color:var(--primary)]"
                    : ""
                }`}
              >
                <Image
                  src="/assets/farmer.png"
                  objectFit="cover"
                  layout="fill"
                  className="cursor-pointer rounded-full"
                />
              </div>
              <p className="text-[color:var(--primary)] font-semibold text-xl">
                Farmer
              </p>
            </div>
            <p className="text-[#464646] font-semibold">or</p>
            <div className="flex flex-col items-center ">
              <div
                onClick={() => setRole("pilot")}
                className={`w-[280px] h-[280px] rounded-full relative ${
                  role === "pilot"
                    ? "border-3 border-[color:var(--primary)]"
                    : ""
                }`}
              >
                <Image
                  src="/assets/pilot.png"
                  objectFit="cover"
                  layout="fill"
                  className="cursor-pointer rounded-full"
                />
              </div>
              <p className="text-[color:var(--primary)] font-semibold text-xl">
                Pilot
              </p>
            </div>
          </div>
          <button
            onClick={handleOnSubmit}
            className={`${
              role === ""
                ? "bg-gray-200 cursor-not-allowed text-gray-700"
                : " bg-[color:var(--primary)] text-white"
            } w-1/2 max-w-xs text-center py-3 text-lg  font-extralight mt-14 rounded-md`}
          >
            Next
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default RoleSelection;
