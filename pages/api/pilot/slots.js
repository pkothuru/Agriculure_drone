import connectMongo from "../../../database/conn";
import Pilots from "../../../model/PilotSchema";
import Slots from "../../../model/SlotSchema";
export default async function handler(req, res) {
  const { method } = req;
  const { email } = req?.query;
  const { getAll } = req?.query || false;
  await connectMongo();
  if (method === "GET") {
    if (getAll) {
      try {
        const slots = await Slots.find({ status: true });
        res.status(200).json({ success: true, message: slots });
      } catch (e) {
        res.status(300).json({ success: false, message: e });
      }
    } else {
      try {
        const pilot = await Pilots.findOne({ email: email });

        const slots = await Slots.find({ pilotID: pilot._id, status: true });
        res.status(200).json({ success: true, message: slots });
      } catch (e) {
        res.status(300).json({ success: false, message: e });
      }
    }
  }
  if (method === "POST") {
    const { email, slot } = req.body;

    try {
      const pilot = await Pilots.findOne({ email: email });
      const createSlot = await Slots.create({
        pilotID: pilot._id,
        ...slot,
      });
      res.status(200).json({ success: true, message: createSlot });
    } catch (e) {
      res.status(300).json({ success: false, message: e });
    }
  }
}
