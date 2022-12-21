import connectMongo from "../../../database/conn";
import Farmers from "../../../model/FarmerSchema";
export default async function handler(req, res) {
  const { method } = req;
  await connectMongo();
  if (method === "GET") {
    const { email } = req?.query;
    try {
      const user = await Farmers.findOne({ email: email });
      res.status(200).json({ success: true, message: user.bookings });
    } catch (e) {
      res.status(300).json({ success: false, message: e });
    }
  }
  if (method === "POST") {
    const { booking, email } = req.body;
    try {
      const order = await Farmers.findOneAndUpdate(
        { email: email },
        { $push: { bookings: booking } },
        { new: true }
      );
      res.status(200).json({ success: true, message: order });
    } catch (e) {
      res.status(300).json({ success: false, message: e });
    }
  }
  if (method === "PUT") {
    const { email, id } = req.body;
    try {
      const updatePayment = await Farmers.findOneAndUpdate(
        {
          email: email,
        },
        {
          $set: { "bookings.$[el].paid": true },
        },
        {
          arrayFilters: [{ "el._id": id }],
          new: true,
        }
      );
      res.status(200).json({ success: true, message: updatePayment });
    } catch (e) {
      res.status(300).json({ success: false, message: e });
    }
  }
}
