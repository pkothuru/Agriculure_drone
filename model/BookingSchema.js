import { Schema, model, models } from "mongoose";

const bookingSchema = new Schema({
  email: String,
  pilotID: String,
  booking: {
    service: String,
    farmDetails: {
      farm: String,
      farmLand: String,
      farmType: String,
    },

    flightDetails: {
      startDate: String,
      endDate: String,
      duration: Number,
    },
    location: {
      lat: Number,
      lng: Number,
    },
  },
});

const Bookings = models.booking || model("booking", bookingSchema);

export default Bookings;
