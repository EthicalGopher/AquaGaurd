import TopBar from "@/components/topbar";
import React from "react";
import { Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const Map = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <TopBar />
        <Text>Map</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Map;
