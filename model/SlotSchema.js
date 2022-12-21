import { Schema, model, models } from "mongoose";

const slotSchema = new Schema({
  pilotID: String,
  start: String,
  end: String,
  status: {
    type: Boolean,
    default: true,
  },
});

const Slots = models.slot || model("slot", slotSchema);

export default Slots;
