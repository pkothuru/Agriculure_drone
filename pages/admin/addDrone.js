import React from "react";
import Layout from "../../layout/adminDashboardLayout";
import {
  Input,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";
const postUrl =
  "http://ec2-52-203-10-77.compute-1.amazonaws.com/flight_data_collect/register-drone/";

const AddDrone = () => {
  return (
    <div>
      <Layout>
        <RegisterForm />
      </Layout>
    </div>
  );
};
const getFormData = (object) =>
  Object.keys(object).reduce((formData, key) => {
    formData.append(key, object[key]);
    return formData;
  }, new FormData());
const RegisterForm = () => {
  const {
    device_id,
    device_model,
    device_maker,
    service_type,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  return (
    <div className="min-h-[80vh] flex justify-center items-center">
      <form
        onSubmit={handleSubmit(async (data) => {
          // const res = await axios.post(postUrl, {
          //   ...data,
          //   device_type: "drone",
          // });
          // console.log(res, "RESPONSE");
          // router.push("/");
          // console.log(data, "DATA");
          const request = getFormData({ ...data, device_type: "drone" });
          const res = await axios.post(postUrl, request);
          router.push("/");
        })}
      >
        <div className="grid grid-cols-2 gap-4 max-w-[1000px] mx-auto">
          <TextField
            label="Device ID"
            type="Number"
            {...register("device_id", { required: true })}
          />
          <TextField
            label="Device Model"
            {...register("device_model", { required: true })}
          />
          <TextField
            label="Device Maker"
            {...register("device_maker", { required: true })}
          />

          {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="service_type"
            value={"payload"}
            {...register("service_type")}
          >
            <MenuItem value={"surveillance"}>Surveillance</MenuItem>
            <MenuItem value={"payload"}>Payload</MenuItem>
            <MenuItem value={"data collection"}>Data Collection</MenuItem>
          </Select>
        </div>
        <div className="flex w-full justify-center items-center mt-8">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default AddDrone;
