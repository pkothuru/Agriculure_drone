import React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

export default function FirstStep({
  fullName,
  email,
  gender,
  phoneNumber,
  birthday,
  updateFields,
}) {
  const isError = () => false;
  return (
    <>
      <h2 className="text-3xl text-[color:var(--primary)] font-semibold mb-4">
        Farmer Details
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
            InputProps={{
              readOnly: true,
            }}
            name="fullName"
            value={fullName}
            onChange={(e) => updateFields({ fullName: e.target.value })}
            error={!!fullName.error}
            helperText={fullName.error}
            required={fullName.required}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            // variant={variant}
            // margin={margin}
            fullWidth
            // label="Email"
            InputProps={{
              readOnly: true,
            }}
            name="email"
            // placeholder="Your email address"
            type="email"
            value={email}
            onChange={(e) => updateFields({ email: e.target.value })}
            error={!!email.error}
            helperText={email.error}
            required={email.required}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            // variant={variant}
            // margin={margin}
            fullWidth
            label="Phone Number"
            name="phoneNumber"
            placeholder="Phone Number"
            type="phone"
            value={phoneNumber.value}
            onChange={(e) => updateFields({ phoneNumber: e.target.value })}
            error={!!phoneNumber.error}
            helperText={phoneNumber.error}
            required={phoneNumber.required}
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
            label="Gender"
            placeholder="Gender"
            name="gender"
            value={gender.value}
            onChange={(e) => updateFields({ gender: e.target.value })}
            error={!!gender.error}
            helperText={gender.error}
            required={gender.required}
          >
            <option value=""></option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </TextField>
        </Grid>
        {/* Birthday */}
        <Grid item xs={12} sm={6}>
          <TextField
            // variant={variant}
            // margin={margin}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            label="Date of birth"
            name="birthday"
            type="date"
            defaultValue={birthday?.value}
            onChange={(e) => updateFields({ birthday: e.target.value })}
            required={birthday.required}
          />
        </Grid>
      </Grid>

      {/* <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          // variant="contained"
          sx={{ mt: 3, ml: 1 }}
          disabled={isError()}
          color="primary"
          // onClick={!isError() ? handleNext : () => null}
        >
          Next
        </Button>
      </Box> */}
    </>
  );
}
