import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import getFormData from "../../../lib/jsToForm";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Modal, Button } from "@mui/material";
import MapPath from "../adminDashboard/MapPath";
import { useRouter } from "next/router";
import Link from "next/link";
import { setLocationType } from "react-geocode";

const postUrl =
  "http://ec2-52-203-10-77.compute-1.amazonaws.com/flight_data_collect/fly-simulation/ ";
const data = {
  plan: `{"fileType":"Plan","mission":{"cruiseSpeed":15,"hoverSpeed":5,"items":[{"altitude":50.00000000005293,"latitude":37.558605,"longitude":-122.04754200000004,"type":"SimpleItem"},{"altitude":49.99999999958835,"latitude":37.55864599999999,"longitude":-122.04716700000002,"type":"SimpleItem"},{"altitude":50.00000000023102,"latitude":37.55854299999999,"longitude":-122.04714700000001,"type":"SimpleItem"},{"altitude":50.00000000013322,"latitude":37.55850099999999,"longitude":-122.04753699999999,"type":"SimpleItem"},{"altitude":49.99999999947457,"latitude":37.55857599999999,"longitude":-122.04759100000001,"type":"SimpleItem"},{"altitude":14.99999999988875,"latitude":37.55835499999999,"longitude":-122.047656,"type":"SimpleItem"},{"altitude":14.99999999990697,"latitude":37.558277999999994,"longitude":-122.04764200000001,"type":"SimpleItem"},{"altitude":14.999999999058375,"latitude":37.55827200000002,"longitude":-122.04751300000001,"type":"SimpleItem"},{"altitude":14.999999999587114,"latitude":37.558371999999984,"longitude":-122.047544,"type":"SimpleItem"},{"altitude":14.999999999485869,"latitude":37.558385999999985,"longitude":-122.047313,"type":"SimpleItem"},{"altitude":15.00000000058955,"latitude":37.558317,"longitude":-122.04730100000003,"type":"SimpleItem"},{"altitude":14.99999999915223,"latitude":37.558319,"longitude":-122.04721900000001,"type":"SimpleItem"},{"altitude":14.999999998778456,"latitude":37.5584,"longitude":-122.047232,"type":"SimpleItem"}]}}`,

  drone_id: 14560,
  service_id: 65,
};

function createData(bookingID, farmer, email, service, location) {
  return { bookingID, farmer, email, service, location };
}
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  minHeight: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  // border: 0,
};

export default function BasicTable() {
  const [plan, setPlan] = useState([]);
  const [postData, setPostData] = useState({
    drone_id: 14590,
    service_id: 65,
    plan: {
      fileType: "Plan",
      mission: { cruiseSpeed: 15, hoverSpeed: 15, items: plan },
    },
  });
  const [fetchedRows, setFetchedRows] = useState([]);
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [open, setOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [simulationConfirmed, setSimulationConfirmed] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const router = useRouter();
  useEffect(() => {
    console.log(plan, "plan");
    setPostData({
      ...postData,
      plan: {
        ...postData.plan,
        mission: {
          ...postData.plan.mission,
          items: plan,
        },
      },
    });
  }, [plan]);
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_HOST}api/bookings`)
      .then(({ data }) => {
        setFetchedRows(
          data.message.map((item) =>
            createData(
              item._id,
              item.pilotID,
              item.email,
              item.booking.service,
              item.booking.location
            )
          )
        );
      });
  }, []);
  const handleStartService = async (droneID) => {
    setConfirmed(true);
    // console.log(postData, "POSTDATA");
    const res = await axios.post(postUrl, getFormData(data));
    setSimulationConfirmed(true);
  };
  const handleOnStart = async (row) => {
    setLocation({ lat: row.location.lat, lng: row.location.lng });
    handleOpen();
  };
  useEffect(() => {
    console.log(location, "LOC TABLE");
  }, [location]);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Booking ID</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Service</TableCell>
            <TableCell>Start</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fetchedRows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left" component="th" scope="row">
                {row.bookingID}
              </TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.service}</TableCell>
              <TableCell>
                <p
                  onClick={() => handleOnStart(row)}
                  className="bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-200 text-white inline-block px-4 py-2 rounded-lg cursor-pointer"
                >
                  Start Service
                </p>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className="border-none rounded-xl flex justify-center items-center flex-col gap-6"
        >
          <div className={`${confirmed ? "hidden" : ""}`}>
            <MapPath
              setPlan={setPlan}
              plan={plan}
              location={location || { lat: 0, lng: 0 }}
            />
          </div>
          <div
            className={`${
              confirmed && !simulationConfirmed ? "flex" : "hidden"
            } flex justify-center items-center`}
          >
            <div className="loader text-blue-600"></div>
          </div>
          <div
            className={`${confirmed || simulationConfirmed ? "hidden" : ""}`}
          >
            <p
              onClick={() => handleStartService()}
              className="bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-200 text-white inline-block px-4 py-2 rounded-lg cursor-pointer"
            >
              Confirm
            </p>
          </div>
          <div
            className={`${
              simulationConfirmed ? "" : "hidden"
            } flex flex-col items-center justify-center gap-24`}
          >
            <p className=" font-bold text-4xl">
              Simulation has <span className="text-green-600">started!</span>
            </p>
            <Link
              className="cursor-pointer"
              href={
                "http://ec2-52-203-10-77.compute-1.amazonaws.com/flightmonitor/"
              }
            >
              <p className="text-white px-4 py-2 cursor-pointer bg-blue-600 hover:bg-blue-700 shadow-lg inline-block shadow-blue-200 rounded-lg">
                Live Simulation
              </p>
            </Link>
          </div>
        </Box>
      </Modal>
    </TableContainer>
  );
}
