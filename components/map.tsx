import React, {useRef} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

const styles = StyleSheet.create({
  mapContainer: {
    position: 'relative',
    height: 250,
  },
  mapViewStyle: {
    height: '100%',
    zIndex: 10,
  },
  markerStyle: {
    height: 27,
    width: 27,
  },
});

const Map = ({
  coordinates,
  title,
}: {
  coordinates: {latitude: number; longitude: number};
  title: string;
}) => {
  const mapRef = useRef(null);

  return (
    <View style={styles.mapContainer}>
      <MapView
        initialRegion={{
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        ref={mapRef}
        style={styles.mapViewStyle}>
        {coordinates && (
          <Marker
            coordinate={{
              ...coordinates,
            }}
            identifier="shop"
            anchor={{x: 0.5, y: 0.5}}
            title={title}>
            <Image
              source={require('../assets/shop.png')}
              style={styles.markerStyle}
            />
          </Marker>
        )}
      </MapView>
    </View>
  );
};

export default Map;
