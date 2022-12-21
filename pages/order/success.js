import { Button } from "@mui/material";
import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
const Success = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Success</title>
      </Head>
      <div className="h-screen w-screen flex justify-center items-center flex-col">
        <div className="h-[500px] flex justify-center items-center flex-col gap-11">
          <h1 className="text-4xl font-bold slide-in-elliptic-top-bck">
            Congratulations! Your order is successfully{" "}
            <span className="text-green-600">Placed.</span>
          </h1>
          <Button
            className="bg-[#1565c0]"
            onClick={() => {
              router.push("/");
            }}
            variant="contained"
          >
            Back to dashboard
          </Button>
        </div>
      </div>
    </>
  );
};

export default Success;
