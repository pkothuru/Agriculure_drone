import React from "react";
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  TextField,
} from "@mui/material";
const StepOne = ({ farmLand, updateFields }) => {
  return (
    <div className="min-h-[350px]">
      <h1 className="font-semibold text-3xl text-[color:var(--primary)]">
        Step 1: Farmland Selection
      </h1>
      <p className="text-md text-gray-600 mt-4">
        Please select the farmland you would like your drone service on.
      </p>
      <div>
        <div>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={farmLand}
              onChange={(e) =>
                updateFields({
                  farm: e.target.value,
                  farmLand: e.target.value,
                  farmType: e.target.value,
                })
              }
            >
              <FormControlLabel
                value="West Plot A_LiveStock_1876 Great Tessarac Road, Mariposa, CA 95613"
                control={<Radio />}
                label="West Plot A: LiveStock"
              />
              <FormControlLabel
                value="West Plot B_Crop_3671 Old Toll Road, Mariposa, CA 95338"
                control={<Radio />}
                label="West Plot B: Crop"
              />
              <FormControlLabel
                value="North Plot B_Nursery_6564 New Toll Road, Mariposa, CA 95338"
                control={<Radio />}
                label="North Plot B: Nursery"
              />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
    </div>
  );
};

export default StepOne;
