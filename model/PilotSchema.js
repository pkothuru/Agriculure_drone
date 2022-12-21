import { Schema, model, models } from "mongoose";

const pilotSchema = new Schema({
  accountRegistered: {
    type: Boolean,
    default: false,
  },
  fullName: String,
  email: String,
  phoneNumber: String,
  gender: String,
  birthday: String,

  cardInfo: {
    cardName: String,
    cardNumber: String,
    cardCVV: String,
    cardEXP: String,
  },
  slots: [
    {
      start: String,
      end: String,
    },
  ],
});

const Pilots = models.pilot || model("pilot", pilotSchema);

export default Pilots;
