import TopBar from "@/components/topbar";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const MyReport = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <TopBar />
        <View>
          <Text>MyReport</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default MyReport;
