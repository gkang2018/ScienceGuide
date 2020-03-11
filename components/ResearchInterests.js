import React, { useState } from "react";
import { View, Text, FlatList } from "react-native";
import InterestsCard from "./InterestsCard";

export default function ResearchInterests() {
  const [selectedLevels, setSelectedLevels] = useState([]);

  const handleAddLevel = selectedLevel => {
    setSelectedLevels(oldArray => [
      ...oldArray,
      { id: Math.random().toString(), value: selectedLevel }
    ]);
    console.log(selectedLevels);
  };

  const interestsData = [
    { interest: "math", image: "../assets/icon.png" },
    { interest: "science", image: "../assets/icon.png" },
    { interest: "physics", image: "../assets/icon.png" },
    { interest: "biology", image: "../assets/icon.png" }
  ];

  return (
    <View>
      <Text h1>Research Interests</Text>
      <Text h4> </Text>
      <FlatList
        data={interestsData}
        renderItem={({ item }) => (
          <InterestsCard
            interest={item.interest}
            onAddSelected={handleAddLevel}
            image={item.image}
          />
        )}
        numColumns={2}
      />
    </View>
  );
}
