import React from "react";
import TextField from "@mui/material/TextField";

export default function SecondStep({
  cardName,
  cardNumber,
  cvv,
  exp,
  updateFields,
}) {
  const isError = () => false;

  return (
    <>
      <h2 className="text-3xl text-[color:var(--primary)] font-semibold mb-4">
        Billing Information
      </h2>
      <p className="text-md font-thin text-gray-600 mb-4">
        Fill in the billing information for your profile.
      </p>
      <div className="flex flex-col items-center gap-5">
        <div className="md:w-3/5 max-w-lg">
          <TextField
            variant="standard"
            // margin={margin}
            fullWidth
            label="Name On Card"
            name="cardName"
            value={cardName}
            onChange={(e) => updateFields({ cardName: e.target.value })}
            required={true}
          />
        </div>

        <div className="md:w-3/5 max-w-lg">
          <TextField
            variant="standard"
            // margin={margin}
            fullWidth
            label="Card Number"
            name="cardNumber"
            value={cardNumber}
            onChange={(e) => updateFields({ cardNumber: e.target.value })}
            required={true}
          />
        </div>
      </div>
      <div className="w-3/5 max-w-lg m-auto flex justify-between gap-5 mt-5">
        <div>
          <TextField
            variant="standard"
            // margin={margin}
            fullWidth
            label="Exp"
            name="exp"
            value={exp}
            onChange={(e) => updateFields({ exp: e.target.value })}
            required={true}
          />
        </div>
        <div>
          <TextField
            variant="standard"
            // margin={margin}
            fullWidth
            label="CVV"
            name="cvv"
            value={cvv}
            onChange={(e) => updateFields({ cvv: e.target.value })}
            required={true}
          />
        </div>
      </div>
    </>
  );
}
