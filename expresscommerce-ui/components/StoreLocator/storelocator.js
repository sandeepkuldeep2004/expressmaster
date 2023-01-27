import { useMemo } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { useState } from "react";
import styles from "./storeLocator.module.css";
import StoreLocatorSearchBox from '../StoreLocator/storesearchbox';
import props from 'prop-types';

import {getStoresByZipCode} from "../../pages/api/store";

function Home(props) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey:"AIzaSyA-gDPQ8zhJoIX3svueFrvHDa61yn0Kqrs",
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

//mapContainerStyle={{position:'unset',color:'blue'}}

const position_array=[]


function Map() {
  const [geolocation, setGeoLocation] = useState({lat: 44, lng: -80});
  const [storeData, setStoreData] = useState([]);
  
  //const center = useMemo(() => ({ lat: 28.7026519, lng: 77.4961996}), []);

  const getPinCodeCoordinates = async (event) => {

    const response_center = await fetch("https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyA-gDPQ8zhJoIX3svueFrvHDa61yn0Kqrs&components=postal_code:201013",
    {
      method:'GET'
    }
    ).then(response=>response.json()).then(data=>{ return data.results[0].geometry.bounds.northeast})
      setGeoLocation(response_center)

    // event.preventDefault();
    
    // const zipCode = "201013"
   // event.target.zipCode.value;

    // const response_Stores = await getStoresByZipCode(zipCode);

    
    // setStoreData(response_Stores.data);
   

  };
  const pageData=props.storeData && Array.isArray(props.storeData) && props.storeData.length > 0 && props.storeData.filter((pdt) => pdt.zipCode==='201013');
   console.log("this is page data",pageData)
  
  
  return (
    <div className={styles.map_container_parent + " " + "flex"}>
      <div className="flex-initial w-1/3">
        <StoreLocatorSearchBox></StoreLocatorSearchBox>
      </div>
    <GoogleMap  zoom={13} center={geolocation} mapContainerClassName={"flex-initial w-2/3" + " " + "h-full"}>
       {pageData ? pageData.map((coordinate, index) => {
    return (
      <MarkerF position={{lat:coordinate.latitude,lng: coordinate.longitude}} />
    );
  }) : <div />}
      
    </GoogleMap>
    </div>
  );
}

export default Home;
