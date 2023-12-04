import { View, Text, StyleSheet } from "react-native";
import React, { memo } from "react";
import { MapMarker, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { defaultStyles } from "@/constants/Styles";
import { ListingGeo } from "@/interfaces/listing-geo";
import { useRouter } from "expo-router";
import MapView from "react-native-map-clustering";

type Props = {
  listings: any;
};

const INITIAL_REGION = {
  latitude: 37.33,
  longitude: -122,
  latitudeDelta: 9,
  longitudeDelta: 9,
};

const ListingsMap = memo(({ listings }: Props) => {
  const router = useRouter();

  const onMarkerSelected = (event: ListingGeo) => {
    router.push(`/listing/${event.properties.id}`);
  };

  const renderCluster = (cluster: any) => {
    const { id, geometry, onPress, properties } = cluster;

    const points = properties.point_count;

    return (
      <Marker
        key={`cluster-${id}`}
        coordinate={{
          longitude: geometry.coordinates[0],
          latitude: geometry.coordinates[1],
        }}
        onPress={onPress}
      >
        <View style={styles.marker}>
          <Text
            style={{
              color: "#000",
              fontSize: 14,
              fontFamily: "mon-sb",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {points}
          </Text>
        </View>
      </Marker>
    );
  };

  return (
    <View style={defaultStyles.container}>
      <MapView
        animationEnabled={false}
        style={StyleSheet.absoluteFill}
        showsUserLocation
        showsMyLocationButton
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_REGION}
        clusterColor="#fff"
        clusterTextColor="#000"
        clusterFontFamily="mon-sb"
        renderCluster={renderCluster}
      >
        {listings.features.map((listing: ListingGeo) => {
          return (
            <MapMarker
              key={listing.properties.id}
              onPress={() => onMarkerSelected(listing)}
              coordinate={{
                latitude: +listing.properties.latitude,
                longitude: +listing.properties.longitude,
              }}
            >
              <View style={styles.marker}>
                <Text style={styles.markerText}>
                  $ {listing.properties.price}
                </Text>
              </View>
            </MapMarker>
          );
        })}
      </MapView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  marker: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 6,
    borderRadius: 12,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 1, height: 10 },
  },
  markerText: {
    fontSize: 14,
    fontFamily: "mon-sb",
  },
});

export default ListingsMap;
