import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import AutoComplete from "react-google-autocomplete";
import { useEffect, useState } from "react";

const containerStyle = {
  width: "700px",
  height: "500px",
};

function MyComponent({ lat, lng, updateFields }) {
  const [lati, setLati] = useState(lat);
  const [lngi, setLngi] = useState(lng);
  const [center, setCenter] = useState({
    lat: lati,
    lng: lngi,
  });
  const [position, setPosition] = useState({
    lat: lati,
    lng: lngi,
  });
  useEffect(() => {
    setCenter({ ...center, lat: lat, lng: lng });
    setPosition({ ...center, lat: lat, lng: lng });
  }, [lat, lng]);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDYARwqk_ZEV99JlO9saOfbNNV7Bd3_EJE",
    libraries: ["places"],
  });

  const [map, setMap] = React.useState(null);
  const handleOnPlaceChanged = (e) => {};
  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Child components, such as markers, info windows, etc. */}
        {/* <Autocomplete
        onLoad={(autocomplete) => handleOnPlaceChanged(autocomplete)}
        // onUnmount={(autocomplete) => handleOnPlaceChanged(autocomplete)}
        // onPlaceChanged={(autocomplete) => handleOnPlaceChanged(autocomplete)}

        // onPlaceChanged={}
        >
        <input
        className="p-4 border-black border"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `32px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
          position: "absolute",
          left: "50%",
          marginLeft: "-120px",
        }}
        />
      </Autocomplete>
    <Marker position={position} /> */}
        <Marker
          draggable={true}
          onDragEnd={(e) =>
            updateFields({ lat: e.latLng.lat(), lng: e.latLng.lng() })
          }
          position={position}
        />
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
