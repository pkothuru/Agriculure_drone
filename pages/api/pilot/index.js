import connectMongo from "../../../database/conn";
import Pilots from "../../../model/PilotSchema";
import Slots from "../../../model/SlotSchema";
import Users from "../../../model/Schema";
export default async function handler(req, res) {
  const { method } = req;
  const { email } = req?.query;
  const { pilotID } = req?.query;
  await connectMongo();
  if (method === "GET") {
    if (email) {
      try {
        const user = await Pilots.findOne({ email: email });
        res.status(200).json({ success: true, message: user });
      } catch (e) {
        res.status(300).json({ success: false, message: e });
      }
    } else if (pilotID) {
      try {
        const user = await Pilots.findById(pilotID);
        res.status(200).json({ success: true, message: user });
      } catch (e) {
        res.status(300).json({ success: false, message: e });
      }
    }
  }
  if (method === "POST") {
    const { user } = req.body;
    try {
      const pilot = await Pilots.create(user);
      const newUser = await Users.findOneAndUpdate(
        { email: pilot.email },
        { pilotID: pilot._id }
      );
      res.status(200).json({ success: true, message: pilot });
    } catch (e) {
      res.status(300).json({ success: false, message: e });
    }
  }
  if (method === "PUT") {
    const { email, slot } = req.body;

    try {
      const pilot = await Pilots.findOne({ email: email });
      const createSlot = await Slots.create({ pilotID: pilot._id, ...slot });
      res.status(200).json({ success: true, message: createSlot });
    } catch (e) {
      res.status(300).json({ success: false, message: e });
    }
  }
}
