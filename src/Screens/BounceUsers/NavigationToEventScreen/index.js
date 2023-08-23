import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import MapView, {Polygon, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import RNLocation from 'react-native-location';

const NavigationToEventScreen = () => {
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    const unsubscribe = RNLocation.subscribeToLocationUpdates(loc => {
       
      loc.push({latitude: 22.7244, longitude: 75.8839});
      setLocations(_ => loc);
    });
    // RNLocation.checkPermission({
    //     ios: 'whenInUse', // or 'always'
    //     android: {
    //       detail: 'coarse' // or 'fine'
    //     }
    //   }).then(currentPermission => {
    //     console.log("CURRENT_PERMISSION - ", currentPermission);
    // });
    RNLocation.requestPermission({
        ios: 'whenInUse', // or 'always'
        android: {
          detail: 'coarse', // or 'fine'
          rationale: {
            title: "We need to access your location",
            message: "We use your location to show where you are on the map",
            buttonPositive: "OK",
            buttonNegative: "Cancel"
          }
        }
      });

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <View style={{flex: 1}}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{flex: 1}}
        region={{
          latitude: 22.7533,
          longitude: 75.8937,
          longitudeDelta: 0.002,
          latitudeDelta: 0.013,
        }}>
        
            <Polyline
            strokeWidth={5} 
            fillColor={'red'}
             strokeColor={"red"}
              coordinates={[
                {latitude: 22.7533, longitude: 75.8937},
                {latitude: 22.7244, longitude: 75.8839},
              ]}
            />
         
      </MapView>
    </View>
  );
};
NavigationToEventScreen.routeName = '/NavigationToEventScreen';
export default NavigationToEventScreen;
