import React from "react";
import Layout from "../../layout/adminDashboardLayout";
import ServiceTable from "../../components/Dashboards/adminDashboard/ServiceTable";
import axios from "axios";
import getFormData from "../../lib/jsToForm";
const postUrl =
  "http://ec2-52-203-10-77.compute-1.amazonaws.com/flight_data_collect/fly-simulation/ ";
const data = {
  plan: `{"fileType":"Plan","mission":{"cruiseSpeed":15,"hoverSpeed":5,"items":[{"altitude":50.00000000005293,"latitude":37.558605,"longitude":-122.04754200000004,"type":"SimpleItem"},{"altitude":49.99999999958835,"latitude":37.55864599999999,"longitude":-122.04716700000002,"type":"SimpleItem"},{"altitude":50.00000000023102,"latitude":37.55854299999999,"longitude":-122.04714700000001,"type":"SimpleItem"},{"altitude":50.00000000013322,"latitude":37.55850099999999,"longitude":-122.04753699999999,"type":"SimpleItem"},{"altitude":49.99999999947457,"latitude":37.55857599999999,"longitude":-122.04759100000001,"type":"SimpleItem"},{"altitude":14.99999999988875,"latitude":37.55835499999999,"longitude":-122.047656,"type":"SimpleItem"},{"altitude":14.99999999990697,"latitude":37.558277999999994,"longitude":-122.04764200000001,"type":"SimpleItem"},{"altitude":14.999999999058375,"latitude":37.55827200000002,"longitude":-122.04751300000001,"type":"SimpleItem"},{"altitude":14.999999999587114,"latitude":37.558371999999984,"longitude":-122.047544,"type":"SimpleItem"},{"altitude":14.999999999485869,"latitude":37.558385999999985,"longitude":-122.047313,"type":"SimpleItem"},{"altitude":15.00000000058955,"latitude":37.558317,"longitude":-122.04730100000003,"type":"SimpleItem"},{"altitude":14.99999999915223,"latitude":37.558319,"longitude":-122.04721900000001,"type":"SimpleItem"},{"altitude":14.999999998778456,"latitude":37.5584,"longitude":-122.047232,"type":"SimpleItem"}]}}`,

  drone_id: 14560,
  service_id: 65,
};
const StartService = () => {
  const handleStartService = async (droneID) => {
    const res = await axios.post(postUrl, getFormData(data));
    console.log(res);
  };
  return (
    <div>
      <Layout>
        <ServiceTable />
      </Layout>
    </div>
  );
};

export default StartService;
