import connectMongo from "../../../database/conn";
import Bookings from "../../../model/BookingSchema";
export default async function handler(req, res) {
  const { method } = req;
  await connectMongo();
  if (method === "GET") {
    try {
      const details = await Bookings.find();
      res
        .status(200)
        .json({ success: true, message: details.map((item) => item) });
    } catch (e) {
      res.status(300).json({ success: false, message: e });
    }
  }
}
