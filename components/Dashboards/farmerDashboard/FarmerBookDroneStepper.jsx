import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useMultistepForm } from "../../../hooks/useMultiForm";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useRouter } from "next/router";
import axios from "axios";
import StepOne from "./FarmerDroneSteps/StepOne";
import StepTwo from "./FarmerDroneSteps/StepTwo";
import StepThree from "./FarmerDroneSteps/StepThree";
import StepFour from "./FarmerDroneSteps/StepFour";
import StepFive from "./FarmerDroneSteps/StepFive";
import { checkout } from "../../../lib/stripe/checkout";

const INITIAL_DATA = {
  farm: "",
  farmLand: "",
  farmType: "",
  selectedDrone: {
    droneID: "",
  },
  cardDetails: {
    cardName: "",
    cardNumber: "",
    exp: "",
    cvv: "",
  },
  flightDetails: {
    startDate: "",
    endDate: "",
    duration: "",
    pilotID: "6373b63a7ff509ddf4469f90",
  },
  lat: 0,
  lng: 0,
};

function FarmerStepper({ session }) {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  // const { data: session, status } = useSession();
  // if (status === "loading") return <>Loading</>;
  useEffect(() => {
    if (session.user.email) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_HOST}api/farmer?email=${session.user.email}`
        )
        .then((res) => {
          setLat(res.data.message.farmInfo.location.lat);
          setLng(res.data.message.farmInfo.location.lng);
        });
    }
  }, [session]);

  const router = useRouter();
  const [data, setData] = useState(INITIAL_DATA);
  const [isLoading, setIsLoading] = useState(0);

  function updateFields(fields) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <StepOne key={"one"} {...data} updateFields={updateFields} />,
      <StepTwo
        key={"two"}
        {...data}
        updateFields={updateFields}
        session={session}
      />,
      <StepThree key={"three"} {...data} updateFields={updateFields} />,
      <StepFour key={"four"} {...data} updateFields={updateFields} />,
      <StepFive key={"five"} {...data} updateFields={updateFields} />,
      // <StepSix {...data} updateFields={updateFields} />,
      // <StepSeven {...data} updateFields={updateFields} />,
    ]);

  // async function onSubmit(e) {
  //   e.preventDefault();
  //   if (!isLastStep) return next();
  //   if (isLoading) return;

  //   router.push("/");
  // }
  async function onStripeSubmit(e) {
    e.preventDefault();
    if (!isLastStep) return next();
    if (isLoading) return;

    setIsLoading(true);
    const updatedInfo = {
      ...data,
      farmType: data.farmType.split("_")[1],
      farmLand: data.farmLand.split("_")[0],
    };
    const bookingInfo = {
      service: data.selectedDrone.service,
      flightDetails: data.flightDetails,
      farmDetails: {
        farm: data.farm.split("_")[2],
        farmType: data.farmType.split("_")[1],
        farmLand: data.farmLand.split("_")[0],
      },
      location: {
        lat: lat,
        lng: lng,
      },
    };
    const booking = await axios.post(
      `${process.env.NEXT_PUBLIC_HOST}api/pilot/booking`,
      {
        email: session.user.email,
        pilotID: data.flightDetails.pilotID,
        booking: bookingInfo,
      }
    );

    const order = await axios.post(
      `${process.env.NEXT_PUBLIC_HOST}api/farmer/bookDrone`,
      {
        email: session.user.email,
        booking: updatedInfo,
      }
    );

    setIsLoading(false);
    router.push("/order/success");
  }
  const labels = ["one", "two", "three", "four", "five"];
  return (
    <div className="">
      <form onSubmit={onStripeSubmit}>
        {/* <div style={{ position: "absolute", top: ".5rem", right: ".5rem" }}>
          {currentStepIndex + 1} / {steps.length}
        </div> */}
        <Stepper activeStep={currentStepIndex} sx={{ py: 3 }} alternativeLabel>
          {labels.map((label) => (
            <Step key={label}>
              <StepLabel></StepLabel>
            </Step>
          ))}
        </Stepper>
        {step}
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            gap: ".5rem",
            justifyContent: "space-between",
          }}
        >
          {!isFirstStep ? (
            <Button type="button" onClick={back}>
              Back
            </Button>
          ) : (
            <div></div>
          )}
          <Button
            className="bg-[color:var(--primary)]"
            variant="contained"
            color="primary"
            type="submit"
          >
            {isLoading ? "Booking" : isLastStep ? "Checkout" : "Next"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default FarmerStepper;
