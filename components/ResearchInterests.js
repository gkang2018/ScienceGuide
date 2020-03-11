import React from "react";
import { View, Text, FlatList } from "react-native";
import InterestsCard from "./InterestsCard";

export default function ResearchInterests() {
  const interestsData = [
    { image: "../assets/icon.png" },
    { image: "../assets/icon.png" }
  ];

  return (
    <View>
      <FlatList
        data={interestsData}
        renderItem={({ item }) => <InterestsCard image={item.image} />}
        numColumns={2}
      />
    </View>
  );
}
