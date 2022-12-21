import connectMongo from "../../../database/conn";
import Pilots from "../../../model/PilotSchema";
export default async function handler(req, res) {
  const { method } = req;

  await connectMongo();
  if (method === "GET") {
    try {
      const users = await Pilots.find({});
      res.status(200).json({ success: true, message: users });
    } catch (e) {
      res.status(300).json({ success: false, message: e });
    }
  }
}
