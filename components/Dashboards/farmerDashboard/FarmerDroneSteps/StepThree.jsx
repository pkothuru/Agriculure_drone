import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Box from "@mui/material/Box";

const StepThree = ({
  flightDetails,
  farm,
  farmLand,
  selectedDrone,
  updateFields,
}) => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  useEffect(() => {
    if (startDate && endDate) {
      const date1 = dayjs(startDate);
      const date2 = dayjs(endDate);

      const duration = date2.diff(date1, "days");
      updateFields({
        flightDetails: {
          ...flightDetails,
          startDate: startDate,
          endDate: endDate,
          duration: duration,
        },
      });
    }
  }, [startDate, endDate]);
  return (
    <div className="min-h-[350px]">
      <h1 className="font-semibold text-3xl text-[color:var(--primary)]">
        Step 3: Schedule Service
      </h1>
      <p className="text-md text-gray-600 mt-4">
        Select a service and choose your drone
      </p>
      <div className="flex mt-8 flex-col items-center gap-8">
        <div className="flex gap-8">
          <BasicDatePicker
            label={"Start Date"}
            updateFields={updateFields}
            date={startDate}
            setDate={setStartDate}
          />
          <BasicDatePicker
            label={"End Date"}
            updateFields={updateFields}
            date={endDate}
            setDate={setEndDate}
          />
        </div>
        {startDate && endDate && (
          <div className="border min-w-[500px] p-6 shadow-md rounded-xl">
            <h1 className="text-xl font-semibold mb-4 text-[color:var(--primary)]">
              Service Details:
            </h1>
            <p className="text-gray-700 font-semibold mb-3">
              Farm: <span className="text-gray-600 font-normal">{farm}</span>
            </p>
            <p className="text-gray-700 font-semibold mb-3">
              FarmLand:{" "}
              <span className="text-gray-600 font-normal">{farmLand}</span>
            </p>
            <p className="text-gray-700 font-semibold mb-3">
              Service:{" "}
              <span className="text-gray-600 font-normal">
                {selectedDrone.service}
              </span>
            </p>
            <p className="text-gray-700 font-semibold mb-3">
              Rental: <span className="text-gray-600 font-normal">By Date</span>
            </p>
            <p className="text-gray-700 font-semibold mb-3">
              Duration:{" "}
              <span className="text-gray-600 font-normal">
                {flightDetails?.duration} days
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StepThree;

function BasicDatePicker({ label, updateFields, date, setDate }) {
  const [value, setValue] = React.useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={value}
        onChange={(newValue) => {
          setValue(newValue.$d);
          setDate(newValue.$d);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
