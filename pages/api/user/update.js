import connectMongo from "../../../database/conn";
import Users from "../../../model/Schema";

export default async function handler(req, res) {
  const { method } = req;
  const { email } = req?.body;
  const { role } = req.body;
  if (method === "POST") {
    await connectMongo();
    try {
      const user = await Users.findOneAndUpdate(
        { email: email },
        { role: role },
        { new: true }
      );
      res.status(200).json({ success: true, message: user });
    } catch (e) {
      res.status(300).json({ success: false, message: e });
    }
  }
}
