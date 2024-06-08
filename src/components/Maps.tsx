"use client";

import { useState, ChangeEvent, useCallback, useEffect } from "react";
import React from "react";
import {
  GoogleMap,
  useLoadScript,
  useJsApiLoader,
  Marker,
  DirectionsRenderer
} from "@react-google-maps/api";

// import houseData from "@/data/maps.json";

const Maps = ({aspectHeight, aspectWidth}:{aspectHeight:number; aspectWidth:number}) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBST8wA2mvHqI0K5W_kexraJU2_IwqybRE",
    // libraries: ['routes']
  });

  const [directionResponse, setDirectionResponse] = useState<google.maps.DirectionsResult | null>(null)
  const [duration, setDuration] = useState('')
  const [distance, setDistance] = useState('')

  type LatLng = {
    lat: number;
    lng: number;
  };
  
  const [originLatLng, setOriginLatLng] = useState<LatLng>({ lat: 0, lng: 0 })
  const [destinationLatLng, setDestinationLatLng] = useState<LatLng>({ lat: 0, lng: 0 })

  const calculateRoute = async () => {
    // if (originLatLng.lat === 0 && originLatLng.lng === 0 || destinationLatLng.lat === 0 && destinationLatLng.lng === 0) {
    //   return
    // }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();

    // Define waypoints as an array of LatLng objects
    const waypoints: google.maps.DirectionsWaypoint[] = [
      { location: { lat: -6.917780, lng: 107.614910 } },
      { location: { lat: -6.874230, lng: 107.616400 } },
      { location: { lat: -6.891480, lng: 107.610657 } },
      { location: { lat: -6.891483, lng: 107.610659 } },
      // Add more waypoints as needed
    ];


    const results = await directionsService.route({
      origin: { lat: -6.902481, lng: 107.618813 },
      waypoints: waypoints,
      destination: { lat: -6.902481, lng: 107.618813 },
      travelMode: google.maps.TravelMode.DRIVING,
      optimizeWaypoints: true
    }) as google.maps.DirectionsResult;
    if (results.routes && results.routes.length > 0 && results.routes[0].legs && results.routes[0].legs.length > 0) {
      setDirectionResponse(results);
      setDistance(results.routes[results.routes.length].legs[0].distance?.text || '');
      setDuration(results.routes[results.routes.length].legs[0].duration?.text || '');
    } else {
      // Handle the case when necessary properties are undefined
      console.error("Invalid route data received:", results);
    }
  }

  useEffect(() => {
    console.log(directionResponse)
    console.log(distance)
    console.log(duration)
  }, [directionResponse])

//   const [map, setMap] = useState(null);

//   const onLoad = useCallback(function callback(map: any) {
//     // This is just an example of getting and using the map instance!!! don't just blindly copy!
//     const bounds = new window.google.maps.LatLngBounds(center);
//     map.fitBounds(bounds);

//     setMap(map)
// }, [])

// const center = {
//     lat: -6.914744, lng: 107.60981
// }

//   const [deskripsiPribadi, setDeskripsiPribadi] = useState("");
//   const [deskripsiBisnis, setDeskripsiBisnis] = useState("");

//   const handleChange = (currentMarker: any) => {
//     props.onClick(currentMarker);
//   };

  return (
    <div>
      {isLoaded && aspectHeight!=0 && aspectWidth!=0 ? (
        <div className={`w-full h-full rounded-[10px]`} style={{ aspectRatio: `${aspectWidth} / ${aspectHeight}` }} onClick={calculateRoute}>
          <GoogleMap
            zoom={17}
            center={{ lat: -6.914744, lng: 107.60981 }}
            mapContainerStyle={{width: "100%", height: "100%"}}
            options={{
                mapTypeControl: false
            }}
          >
            {/* {props.currentMap.map((data: any, index: any) => (
              <Marker
                key={index}
                position={{ lat: data.lat_position, lng: data.long_position }}
                onClick={() => handleChange(data)}
              />
            ))} */}
            {/* <Marker position={{ lat: -6.914744, lng: 107.60981 }}/>
            <Marker position={{ lat: -6.824744, lng: 107.70732 }}/> */}
            {directionResponse && <DirectionsRenderer directions={directionResponse}/> }
          </GoogleMap>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Maps