import React from "react";
import Head from "next/head";
import Layout from "../../../layout/navbarLayout";
import Image from "next/image";
import axios from "axios";
import { Divider } from "@mui/material";
import { useSession } from "next-auth/react";
import { getSession } from "next-auth/react";
//
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
//
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { list } from "postcss";
//

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "1rem",
  p: 4,
};
//

const Schedule = ({ session, data }) => {
  const [startDateAndTime, setStartDateAndTime] = React.useState(dayjs());
  const [endDateAndTime, setEndDateAndTime] = React.useState(dayjs());

  return (
    <>
      <Head>
        <title>Schedule</title>
      </Head>
      <Layout>
        <div className="grid grid-cols-2 gap-8">
          <UpComing pilotID={data.message.pilotID} />
          <Availabitily
            start={startDateAndTime}
            setStart={setStartDateAndTime}
            end={endDateAndTime}
            setEnd={setEndDateAndTime}
          />
        </div>
      </Layout>
    </>
  );
};

export default Schedule;

const UpComing = ({ pilotID }) => {
  const [bookings, setBookings] = React.useState([]);
  React.useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_HOST}api/pilot/booking?pilotID=${pilotID}`
      )
      .then((res) => {
        setBookings(res.data.message);
      });
  }, []);
  return (
    <div className="p-4 rounded-lg">
      <p className="mb-4 font-semibold text-[color:var(--primary)]">
        Upcoming Flights
      </p>
      {bookings.map((booking, index) => (
        <div
          key={index}
          className="flex gap-8  text-sm p-6 rounded-lg shadow-sm "
        >
          <div className="flex-1 ">
            <p className="font-semibold text-[color:var(--primary)]">
              {dayjs(booking?.booking?.flightDetails?.startDate).format(
                `DD/MM/YYYY`
              )}
            </p>
            {/* <p className="font-semibold text-xs text-gray-700 mb-2">
              {" "}
              10:00 AM
            </p> */}
            <p className="text-gray-600">{booking.booking.farmDetails.farm}</p>
            <p className="text-gray-600">
              {booking.booking.farmDetails.farmLand}
            </p>
          </div>
          <div className="flex-1 flex flex-col items-end justify-start">
            <p className="font-semibold text-[color:var(--primary)]">
              {booking.booking?.service}
            </p>
            <div className="relative h-[60px] w-[130px]">
              <Image
                className="rounded-2xl"
                src="/assets/crop.png"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        </div>
      ))}

      {/* <Divider />
      <div className="flex gap-8 text-sm p-6 rounded-lg shadow-sm  mt-4">
        <div className="flex-1 ">
          <p className="font-semibold text-[color:var(--primary)]">
            29/10/2022
          </p>
          <p className="font-semibold text-xs text-gray-700 mb-2"> 10:00 AM</p>
          <p className="text-gray-600">
            3671 Old Toll Road, Mariposa, CA 95338{" "}
          </p>
          <p className="text-gray-600">West Plot A Crop</p>
        </div>
        <div className="flex-1 flex flex-col items-end justify-start">
          <p className="font-semibold text-[color:var(--primary)]">
            Data Collection
          </p>
          <div className="relative h-[60px] w-[130px]">
            <Image
              className="rounded-2xl"
              src="/assets/crop.png"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </div> */}
    </div>
  );
};

const Availabitily = (props) => {
  const [slots, setSlots] = React.useState([]);
  const { data: session, status } = useSession();
  React.useEffect(() => {
    if (status === "authenticated") {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_HOST}api/pilot/slots?email=${session.user?.email}`
        )
        .then((res) => setSlots(res.data.message));
    }
  }, [session]);
  return (
    <div className="p-4 ">
      <p className="mb-4 font-semibold text-[color:var(--primary)]">
        Availability
      </p>
      <div>
        <div>
          {slots.map((slot, index) => (
            <div
              key={index}
              className="border p-6 rounded-lg my-4 font-semibold text-[color:var(--primary)] text-normal"
            >
              <p>
                {dayjs(slot.start).format("DD/MM/YYYY")} -{" "}
                {dayjs(slot.end).format("DD/MM/YYYY")}
              </p>
              <p className="font-normal text-sm">
                {dayjs(slot.start).format("hh:mm A")} -{" "}
                {dayjs(slot.end).format("hh:mm A")}
              </p>
            </div>
          ))}
        </div>
        <div>
          <BasicModal text={"Add Slot"} setSlots={setSlots} {...props} />
        </div>
      </div>
    </div>
  );
};

function BasicModal({
  text,
  setStart,
  setEnd,
  start,
  end,
  setSlots,
  ...props
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { data: session, status } = useSession();
  const handleAdd = async () => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_HOST}api/pilot/slots`,
      {
        email: session.user.email,
        slot: {
          start: start,
          end: end,
        },
      }
    );
  };
  return (
    <div>
      <Button
        color="primary"
        className="bg-[color:var(--primary)]"
        variant="contained"
        onClick={handleOpen}
      >
        {text}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="">
            <p
              className="cursor-pointer text-red-500 text-end"
              onClick={handleClose}
            >
              Close
            </p>
            <div className="flex gap-6">
              <div className="mt-4">
                <BasicDateTimePicker
                  label={"Start Date and Time"}
                  setTime={setStart}
                />
              </div>
              <div className="mt-4">
                <BasicDateTimePicker
                  label={"End Date and Time"}
                  setTime={setEnd}
                />
              </div>
            </div>
            <div className="mt-6 w-full flex justify-center">
              <Button
                className="bg-[color:var(--primary)]"
                variant="contained"
                onClick={async () => {
                  setSlots((list) => [
                    ...list,
                    { start: start?.$d, end: end?.$d },
                  ]);
                  await handleAdd();
                  handleClose();
                }}
              >
                Confirm
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

function BasicDateTimePicker({ label, setTime }) {
  const [value, setValue] = React.useState();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label={label}
        ampm={false}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          setTime(newValue);
        }}
      />
    </LocalizationProvider>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  } else {
    const res = await fetch(
      `${process.env.HOST}api/user?email=${session.user.email}`
    );
    const data = await res.json();

    return {
      props: { session, data },
    };
  }
}
