import axios from "axios";
const url =
  "http://ec2-52-203-10-77.compute-1.amazonaws.com/flight_data_collect/register-drone/";
export default async function handler(req, res) {
  const { method } = req;
  if (method === "POST") {
    const droneData = req.body;
    console.log(droneData);
    try {
      const drone = await axios.post(url, droneData);
      res.status(200).json({ success: true, message: drone });
    } catch (e) {
      res.status(300).json({ success: false, message: e });
    }
  }
}
