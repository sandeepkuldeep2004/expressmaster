import { useMemo } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { useState } from "react";

function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey:"AIzaSyA-gDPQ8zhJoIX3svueFrvHDa61yn0Kqrs",
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}


const position_array=[{lat: 44, lng: -80},{lat: 16.2976125, lng: 80.4459302 },{lat: 90, lng: -110 },{lat: 89, lng: -90 }]


function Map() {
  const [geolocation, setGeoLocation] = useState({lat: 44, lng: -80});
  
  //const center = useMemo(() => ({ lat: 28.7026519, lng: 77.4961996}), []);


  const getPinCodeCoordinates = async () => {
    const response = await fetch("https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyA-gDPQ8zhJoIX3svueFrvHDa61yn0Kqrs&components=postal_code:201013",
    {
      method:'GET'
    }
    ).then(response=>response.json()).then(data=>{ return data.results[0].geometry.bounds.northeast})
      setGeoLocation(response)
  };
   
  console.log("this is geolocation out",geolocation)
  
  return (
    <div>
      <button onClick={getPinCodeCoordinates}>getgeocordiniates</button>
    
    <GoogleMap zoom={15} center={geolocation} mapContainerClassName="map-container">
       {position_array ? position_array.map((lat, index) => {
    return (
      <MarkerF position={lat} />
    );
  }) : <div />}
      
    </GoogleMap>
    </div>
  );
}

export default Home;