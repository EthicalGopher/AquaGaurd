import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import "../../global.css";

import { TAB_LAYOUT } from "@/constants/mockData";
import { TabLayoutType } from "@/constants/types";

interface tabIconType {
  shape: React.ComponentProps<typeof FontAwesome>["name"];
  focused: boolean;
}

const TabIcon = ({ shape, focused = true }: tabIconType) => {
  const scale = useSharedValue(focused ? 1.1 : 1);

  React.useEffect(() => {
    scale.value = withSpring(focused ? 1.2 : 1, {
      damping: 15,
      stiffness: 150,
    });
  }, [focused]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <Animated.View style={[styles.iconContainer, animatedStyle]}>
      <FontAwesome
        name={shape}
        size={26}
        color={focused ? "#2563eb" : "#6b7280"}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopWidth: 1,
          borderTopColor: "#e5e7eb",
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: "#2563eb",
        tabBarInactiveTintColor: "#6b7280",
        tabBarShowLabel: true,
      }}
    >
      {TAB_LAYOUT.map((item) => (
        <Tabs.Screen
          key={item.name}
          name={item.name}
          options={{
            title: item.title,
            tabBarIcon: ({ focused }) => (
              <TabIcon shape={item.shape} focused={focused} />
            ),
          }}
        />
      ))}
      <Tabs.Screen name="report/[id]" options={{ href: null }} />
    </Tabs>
  );
}
