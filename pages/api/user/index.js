import connectMongo from "../../../database/conn";
import Users from "../../../model/Schema";
export default async function handler(req, res) {
  const { method } = req;
  const { email } = req?.query;
  if (method === "GET") {
    await connectMongo();
    try {
      const user = await Users.findOne({ email: email || "" });
      res.status(200).json({ success: true, message: user });
    } catch (e) {
      res.status(300).json({ success: false, message: e });
    }
  }
}
