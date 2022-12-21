import React from "react";
import MyMapComponent from "../../Maps/Map";
const MapStep = ({ lat, lng, updateFields }) => {
  return (
    <div className="flex items-center justify-center">
      <MyMapComponent lat={lat} lng={lng} updateFields={updateFields} />
    </div>
  );
};

export default MapStep;
