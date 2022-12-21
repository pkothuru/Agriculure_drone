import React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import AutoComplete from "react-google-autocomplete";

export default function SecondStep({
  farmName,
  farmLandType,
  farmAddress,
  updateFields,
}) {
  const isError = () => false;

  return (
    <>
      <h2 className="text-3xl text-[color:var(--primary)] font-semibold mb-4">
        Farm Information
      </h2>
      <p className="text-md font-thin text-gray-600 mb-4">
        Fill in the data for your profile. It will only take a couple of
        minutes.
      </p>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            // variant={variant}
            // margin={margin}
            fullWidth
            label="Name"
            name="farmName"
            value={farmName.value}
            onChange={(e) => updateFields({ farmName: e.target.value })}
            error={!!farmName.error}
            helperText={farmName.error}
            required={farmName.required}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            // margin={margin}
            fullWidth
            select
            SelectProps={{
              native: true,
            }}
            label="Plot Type"
            placeholder="Plot Type"
            name="plotType"
            value={farmLandType.value}
            onChange={(e) => updateFields({ farmLandType: e.target.value })}
          >
            <option value=""></option>
            <option value="Crop">Crop</option>
            <option value="LiveStock">LiveStock</option>
            <option value="Fruits">Fruits</option>
            <option value="Nursery">Nursery</option>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <AutoComplete
            placeholder="Farm Address"
            className="px-[14px] py-[16.5px] border w-full rounded-sm"
            apiKey="AIzaSyDYARwqk_ZEV99JlO9saOfbNNV7Bd3_EJE"
            onPlaceSelected={(place) => {
              updateFields({
                farmAddress: place.formatted_address,
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
              });
            }}
          />
          {/* <TextField
            // variant={variant}
            // margin={margin}
            fullWidth
            label="Address"
            name="farmAddress"
            value={farmAddress.value}
            onChange={(e) => updateFields({ farmAddress: e.target.value })}
            error={!!farmAddress.error}
            helperText={farmAddress.error}
            required={farmAddress.required}
          /> */}
        </Grid>
      </Grid>
    </>
  );
}
