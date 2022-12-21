import axios from "axios";

export default async function handler(req, res) {
  const { method } = req;
  const { email } = req?.query;
  if (method === "GET") {
    try {
      const drones = await axios.get(
        "http://ec2-52-203-10-77.compute-1.amazonaws.com/flight_data_collect/get-drones/"
      );
      res.status(200).json(drones);
    } catch (e) {
      res.status(300).json(e);
    }
  }
}
