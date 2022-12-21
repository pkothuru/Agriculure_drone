import { Button } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import FirstStep from "./FirstStep";
import { useMultistepForm } from "../../hooks/useMultiForm";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useRouter } from "next/router";
import axios from "axios";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
const INITIAL_DATA = {
  fullName: "",

  email: "",
  gender: "",
  phoneNumber: "",
  birthday: "",
  // step 2

  cardName: "",
  cardNumber: "",
  exp: "",
  cvv: "",
};

function PilotStepper({ user }) {
  const router = useRouter();
  const [data, setData] = useState({
    ...INITIAL_DATA,
    fullName: user.name,
    email: user.email,
  });
  const [isLoading, setIsLoading] = useState(0);
  function updateFields(fields) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <FirstStep
        key={"ones"}
        {...data}
        user={user}
        updateFields={updateFields}
      />,
      <SecondStep key={"twos"} {...data} updateFields={updateFields} />,
      <ThirdStep key={"threes"} {...data} updateFields={updateFields} />,
    ]);

  async function onSubmit(e) {
    e.preventDefault();
    if (!isLastStep) return next();
    setIsLoading(true);
    const updatedInfo = {
      fullName: data.fullName,
      email: data.email,
      gender: data.gender,
      birthday: data.birthday,
      phoneNumber: data.phoneNumber,
      accountRegistered: true,

      cardInfo: {
        name: data.cardName,
        number: data.cardNumber,
        exp: data.exp,
        cvv: data.cvv,
      },
    };
    const user = await axios.post(`${process.env.NEXT_PUBLIC_HOST}api/pilot`, {
      user: updatedInfo,
    });
    setIsLoading(false);
    router.push("/");
  }
  const labels = ["one", "two", "three"];
  return (
    <div className="">
      <form onSubmit={onSubmit}>
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
            {isLoading ? "Loading" : isLastStep ? "Finish" : "Next"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PilotStepper;
