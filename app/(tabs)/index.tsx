import { View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import ExploreHeader from "@/components/ExploreHeader";
import Listings from "@/components/Listings";
import { useState, useMemo } from "react";
import listingsData from "@/assets/data/airbnb-listings.json";
import listingsDataGeo from "@/assets/data/airbnb-listings.geo.json";
import ListingsMap from "@/components/ListingsMap";
import ListingsBottomSheet from "@/components/ListingsBottomSheet";

const Page = () => {
  const [category, setCategory] = useState("Tiny homes");

  const items = useMemo(() => listingsData as any, []);
  const geoItems = useMemo(() => listingsDataGeo as any, []);

  const onDataChange = (category: string) => {
    setCategory(category);
  };

  return (
    <View style={{ flex: 1, marginTop: 80 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChange={onDataChange} />,
        }}
      />
      <ListingsMap listings={geoItems} />
      <ListingsBottomSheet category={category} listings={items} />
    </View>
  );
};

export default Page;
