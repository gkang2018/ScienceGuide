import React, { useState } from "react";
import { View, Text, FlatList } from "react-native";
import InterestsCard from "./InterestsCard";

export default function ResearchInterests() {
  const [selectedLevels, setSelectedLevels] = useState([]);

  const handleAddLevel = () => {
    setSelectedLevels(oldArray => [...oldArray, newElement]);
  };

  const interestsData = [
    { image: "../assets/icon.png" },
    { image: "../assets/icon.png" },
    { image: "../assets/icon.png" },
    { image: "../assets/icon.png" }
  ];

  return (
    <View>
      <Text h1>Research Interests</Text>
      <Text h4></Text>
      <FlatList
        data={interestsData}
        renderItem={({ item }) => (
          <InterestsCard onPress={handleAddLevel} image={item.image} />
        )}
        numColumns={2}
      />
    </View>
  );
}
