import TopBar from "@/components/topbar";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  Share,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { MOCK_FEED_ITEMS, MOCK_HOTSPOTS } from "@/constants/mockData";

const Home = () => {
  const router = useRouter();

  const onShare = async (title: string, location: string) => {
    try {
      await Share.share({
        message: `AquaGuard Report: ${title}\nLocation: ${location}\n\nCheck out this water quality report on AquaGuard!`,
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-background">
        <TopBar />
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Trending Hotspots Section */}
          <View className="mb-10 pt-6">
            <View className="px-6 mb-4 flex-row justify-between items-end">
              <View>
                <Text className="text-primary font-bold text-xs tracking-[2px] uppercase mb-1">
                  Live Intelligence
                </Text>
                <Text className="text-3xl font-black tracking-tight text-on-surface">
                  Trending Hotspots
                </Text>
              </View>
              <TouchableOpacity>
                <Text className="text-primary font-semibold text-sm">
                  View Map
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 24, gap: 24 }}
            >
              {MOCK_HOTSPOTS.map((hotspot) => (
                <TouchableOpacity 
                  key={hotspot.id} 
                  onPress={() => router.push(`/report/${hotspot.id}`)}
                  className="w-72 rounded-lg bg-surface-container-lowest overflow-hidden border border-outline-variant/10"
                >
                  <Image
                    source={{ uri: hotspot.image }}
                    className="w-full h-48 object-cover"
                  />
                  <View className="absolute top-4 left-4">
                    <View className={`${hotspot.qualityColorClass} px-3 py-1 rounded-full border border-tertiary-dim/10`}>
                      <Text className="text-on-tertiary-container text-[10px] font-bold uppercase tracking-wider">
                        {hotspot.quality}
                      </Text>
                    </View>
                  </View>
                  <View className="p-4">
                    <Text className="font-bold text-lg leading-tight text-on-surface">
                      {hotspot.title}
                    </Text>
                    <View className="flex-row items-center gap-1 mt-1">
                      <MaterialIcons
                        name="location-on"
                        size={14}
                        color="#595c5e"
                      />
                      <Text className="text-on-surface-variant text-sm">
                        {hotspot.location}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Filters Section */}
          <View className="px-6 mb-8">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 12 }}
              className="pb-2"
            >
              <TouchableOpacity className="flex-row items-center gap-2 bg-primary px-5 py-2.5 rounded-full shadow-lg shadow-primary/20">
                <MaterialIcons name="filter-list" size={16} color="white" />
                <Text className="text-on-primary text-sm font-medium">
                  All Reports
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-row items-center gap-2 bg-surface-container-lowest px-5 py-2.5 rounded-full border border-outline-variant/10">
                <MaterialIcons name="check-circle" size={16} color="#006b1b" />
                <Text className="text-on-surface text-sm font-medium">
                  Good
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-row items-center gap-2 bg-surface-container-lowest px-5 py-2.5 rounded-full border border-outline-variant/10">
                <MaterialIcons name="warning" size={16} color="#005a53" />
                <Text className="text-on-surface text-sm font-medium">
                  Moderate
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-row items-center gap-2 bg-surface-container-lowest px-5 py-2.5 rounded-full border border-outline-variant/10">
                <MaterialIcons name="dangerous" size={16} color="#b31b25" />
                <Text className="text-on-surface text-sm font-medium">
                  Severe
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>

          {/* Social Feed */}
          <View className="px-6 space-y-8 pb-10">
            {MOCK_FEED_ITEMS.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                onPress={() => router.push(`/report/${item.id}`)}
                className="bg-surface-container-lowest rounded-lg overflow-hidden border border-outline-variant/10 mb-8"
              >
                <View className="p-5 flex-row items-center justify-between">
                  <View className="flex-row items-center gap-3">
                    <Image
                      source={{ uri: item.authorImage }}
                      className="w-12 h-12 rounded-full"
                    />
                    <View>
                      <Text className="font-bold text-on-surface">
                        {item.author}
                      </Text>
                      <Text className="text-xs text-on-surface-variant">
                        {item.location}
                      </Text>
                    </View>
                  </View>
                  {item.isVerified && (
                    <View className="flex-row items-center gap-1 bg-primary/10 px-3 py-1.5 rounded-full">
                      <MaterialIcons name="verified" size={12} color="#006289" />
                      <Text className="text-primary text-[10px] font-bold uppercase">
                        Verified
                      </Text>
                    </View>
                  )}
                </View>

                <View className="px-5 pb-4">
                  <View className="relative rounded-lg overflow-hidden h-64 bg-surface-container">
                    <Image
                      source={{ uri: item.image }}
                      className="w-full h-full object-cover"
                    />
                    <View className="absolute bottom-4 left-4 flex-row gap-2">
                      {item.ph && (
                        <View className="bg-surface/90 px-3 py-1.5 rounded-full">
                          <Text className="text-[10px] font-bold text-on-surface">
                            pH {item.ph}
                          </Text>
                        </View>
                      )}
                      {item.turbidity && (
                        <View className="bg-surface/90 px-3 py-1.5 rounded-full">
                          <Text className="text-[10px] font-bold text-on-surface">
                            {item.turbidity}
                          </Text>
                        </View>
                      )}
                    </View>
                    <View className="absolute top-4 right-4">
                      <View className={`${item.qualityColorClass} px-4 py-1.5 rounded-full`}>
                        <Text className="text-on-tertiary text-xs font-bold">
                          {item.quality}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <Text className="mt-4 text-on-surface-variant text-sm leading-relaxed">
                    {item.description}
                  </Text>

                  <View className="mt-6 pt-4 border-t border-outline-variant/10 flex-row items-center justify-between">
                    <View className="flex-row items-center gap-4">
                      <TouchableOpacity className="flex-row items-center gap-1.5">
                        <MaterialIcons
                          name="volunteer-activism"
                          size={20}
                          color="#595c5e"
                        />
                        <Text className="text-xs font-semibold text-on-surface-variant">
                          {item.supportCount} Support
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity className="flex-row items-center gap-1.5">
                        <MaterialIcons
                          name="chat-bubble-outline"
                          size={20}
                          color="#595c5e"
                        />
                        <Text className="text-xs font-semibold text-on-surface-variant">
                          {item.commentCount}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => onShare(item.author + "'s Report", item.location)}>
                      <MaterialIcons name="share" size={20} color="#595c5e" />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Home;
