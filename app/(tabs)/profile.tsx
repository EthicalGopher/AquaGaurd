import TopBar from "@/components/topbar";
import React from "react";
import { Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <TopBar />
        <Text>Profile</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Profile;
