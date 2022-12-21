import connectMongo from "../../../database/conn";
import Bookings from "../../../model/BookingSchema";
export default async function handler(req, res) {
  const { method } = req;
  const { email } = req?.query;
  const { pilotID } = req?.query;
  await connectMongo();
  if (method === "GET") {
    try {
      const details = await Bookings.find({ pilotID: pilotID });
      res.status(200).json({ success: true, message: details });
    } catch (e) {
      res.status(300).json({ success: false, message: e });
    }
  }
  if (method === "POST") {
    const { email, booking } = req.body;
    console.log(req.body);
    try {
      const booking = await Bookings.create(req.body);
      res.status(200).json({ success: true, message: booking });
    } catch (e) {
      res.status(300).json({ success: false, message: e });
    }
  }
}
