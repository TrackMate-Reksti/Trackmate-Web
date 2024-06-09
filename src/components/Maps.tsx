import { useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker
} from "@react-google-maps/api";

type LatLng = {
  lat: number;
  lng: number;
};

interface MapsProps {
  aspectHeight: number;
  aspectWidth: number;
  markerPosition?: LatLng | null;
  markers: LatLng[]
}

const Maps: React.FC<MapsProps> = ({ aspectHeight, aspectWidth, markerPosition, markers }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDWvTCGCS5ChiGue-zyl5CNnp_ospsfv_M",
  });

  return (
    <div>
      {isLoaded && aspectHeight !== 0 && aspectWidth !== 0 ? (
        <div className={`w-full h-full rounded-[10px]`} style={{ aspectRatio: `${aspectWidth} / ${aspectHeight}` }}>
          <GoogleMap
            zoom={15}
            center={{lat: -6.902327, lng: 107.618107}}
            mapContainerStyle={{ width: "100%", height: "100%" }}
            options={{
              mapTypeControl: false
            }}
          >
            {markers.map((marker, index) => (
              <Marker key={index} position={marker} />
            ))}
          </GoogleMap>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Maps;
