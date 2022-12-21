import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Polyline,
} from "@react-google-maps/api";
import AutoComplete from "react-google-autocomplete";
import { useEffect, useState } from "react";
import React from "react";

function MyComponent({ location, setPlan, plan, updateFields }) {
  console.log(location, "LOC");
  const containerStyle = {
    width: "700px",
    height: "500px",
  };
  const [center, setCenter] = useState({
    lat: location.lat,
    lng: location.lng,
  });

  //   useEffect(() => {
  //     setCenter({ ...center, lat: lat, lng: lng });
  //     setPosition({ ...center, lat: lat, lng: lng });
  //   }, [lat, lng]);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDYARwqk_ZEV99JlO9saOfbNNV7Bd3_EJE",
    libraries: ["places"],
  });

  const [map, setMap] = React.useState(null);
  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);
  const onLoad1 = (polyline) => {
    console.log("polyline: ", polyline);
  };
  const options = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    paths: [
      { lat: 37.772, lng: -122.214 },
      { lat: 21.291, lng: -157.821 },
      { lat: -18.142, lng: 178.431 },
      { lat: -27.467, lng: 153.027 },
    ],
    zIndex: 1,
  };

  const [mapPath, setMapPath] = useState([
    {
      lat: location.lat,
      lng: location.lng,
    },
  ]);
  useEffect(() => {
    console.log(mapPath, "Map path");
  }, [mapPath]);

  return isLoaded ? (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={(e) => {
          setMapPath([
            ...mapPath,
            { lat: e.latLng.lat(), lng: e.latLng.lng() },
          ]);
          setPlan([
            ...plan,
            {
              altitude: 50,
              latitude: e.latLng.lat(),
              longitude: e.latLng.lng(),
              type: "SimpleItem",
            },
          ]);
        }}
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
        <Marker position={center} />
        <Polyline
          onLoad={onLoad1}
          path={mapPath}
          options={options}
          editable={true}
        />
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}
export default MyComponent;
