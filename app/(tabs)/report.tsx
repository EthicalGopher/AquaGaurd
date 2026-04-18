import TopBar from "@/components/topbar";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { MOCK_ACTIVITIES } from "@/constants/mockData";

const MyReport = () => {
  const router = useRouter();

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-background">
        <TopBar />
        <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
          <View className="flex-row justify-between items-end mb-6">
            <Text className="text-2xl font-black tracking-tight text-on-surface">
              Recent Activity
            </Text>
            <TouchableOpacity>
              <Text className="text-primary font-bold text-sm">View All</Text>
            </TouchableOpacity>
          </View>

          <View className="space-y-4">
            {MOCK_ACTIVITIES.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                onPress={() => router.push(`/report/${item.id}`)}
                className={`p-4 rounded-lg flex-row items-center gap-4 border border-outline-variant/10 mb-3 ${item.containerColorClass || 'bg-surface-container-lowest'}`}
              >
                <View className="w-12 h-12 bg-white/50 rounded-full items-center justify-center">
                  <MaterialIcons name={item.icon} size={24} color={item.iconColor} />
                </View>
                <View className="flex-1">
                  <Text className="font-bold text-on-surface text-sm">
                    {item.title}
                  </Text>
                  <Text className="text-xs text-on-surface-variant">
                    {item.location} • {item.time}
                  </Text>
                </View>
                <View className={`px-3 py-1 rounded-full ${item.containerColorClass}`}>
                  <Text className={`${item.statusColorClass} text-[10px] font-black uppercase`}>
                    {item.status}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <View className="h-20" />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default MyReport;
