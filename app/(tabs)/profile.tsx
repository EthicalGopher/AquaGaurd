import TopBar from "@/components/topbar";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Image, ScrollView, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-background">
        <TopBar />
        <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
          {/* Welcome Section */}
          <View className="relative overflow-hidden bg-primary-container/20 rounded-lg p-6 flex-row items-center gap-4 mb-8">
            <View className="flex-1 space-y-1">
              <Text className="text-3xl font-extrabold tracking-tight text-on-surface">
                Hello, Alex!
              </Text>
              <Text className="text-on-surface-variant font-medium text-sm">
                Your contributions are keeping our waters pristine. 12 lives impacted this month.
              </Text>
            </View>
            <View className="w-20 h-20 rounded-full overflow-hidden border-4 border-surface-container-lowest shadow-lg">
              <Image
                source={{
                  uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9qBSTe7pQi_BhNd81ncA9QECthYB7w0u-YIDFdHfXl5Vl14GZWFtiTOGnoyLdLcmv6DJoDjb_YArEoSjNPhCEKwvGRLiig2oKGNGMhnVFQ_QSoWrnL2eN6sCmZ0t3OoFDtEjWeeXwGNCTnOvDF9Ljqy3P6qKXmZmZe2wgq6ekC6x8tqBIu_G9FQYYz6yK4lfr7nRTcblSg7AaKSeKkWEPGPL571DNNA6NhyZAnjBIIf5K__CkD7QHMQh-38tfrlRjUwr_v73QtQ",
                }}
                className="w-full h-full object-cover"
              />
            </View>
          </View>

          {/* Summary Grid (Bento Style) */}
          <View className="flex-row flex-wrap gap-4 mb-8">
            <View className="w-[47%] bg-surface-container-lowest p-5 rounded-lg border border-outline-variant/15 aspect-square justify-between">
              <MaterialIcons name="assessment" size={32} color="#006289" />
              <View>
                <Text className="text-3xl font-black text-on-surface">12</Text>
                <Text className="text-[10px] font-bold text-on-surface-variant tracking-wider uppercase">
                  Total Reports
                </Text>
              </View>
            </View>
            <View className="w-[47%] bg-surface-container-lowest p-5 rounded-lg border border-outline-variant/15 aspect-square justify-between">
              <MaterialIcons name="verified" size={32} color="#006b1b" />
              <View>
                <Text className="text-3xl font-black text-on-surface">8</Text>
                <Text className="text-[10px] font-bold text-on-surface-variant tracking-wider uppercase">
                  Verified
                </Text>
              </View>
            </View>
            <View className="w-[47%] bg-surface-container-lowest p-5 rounded-lg border border-outline-variant/15 aspect-square justify-between">
              <MaterialIcons name="task-alt" size={32} color="#00675f" />
              <View>
                <Text className="text-3xl font-black text-on-surface">5</Text>
                <Text className="text-[10px] font-bold text-on-surface-variant tracking-wider uppercase">
                  Resolved
                </Text>
              </View>
            </View>
            <View className="w-[47%] bg-error-container/10 p-5 rounded-lg border border-error/10 aspect-square justify-between">
              <MaterialIcons name="warning" size={32} color="#b31b25" />
              <View>
                <Text className="text-3xl font-black text-on-surface">2</Text>
                <Text className="text-[10px] font-bold text-on-surface-variant tracking-wider uppercase">
                  Active Alerts
                </Text>
              </View>
            </View>
          </View>

          {/* Your Badges Section */}
          <View className="mb-10">
            <Text className="text-2xl font-black tracking-tight text-on-surface mb-6">
              Your Badges
            </Text>
            <View className="bg-surface-container-low rounded-lg p-6 flex-row flex-wrap justify-between gap-y-6">
              <View className="items-center w-[45%]">
                <View className="w-16 h-16 rounded-full bg-primary items-center justify-center shadow-lg border-4 border-surface-container-lowest mb-2">
                  <MaterialIcons name="shield" size={32} color="white" />
                </View>
                <Text className="text-[10px] font-bold text-on-surface uppercase tracking-tighter text-center">
                  Water Guardian
                </Text>
              </View>
              <View className="items-center w-[45%]">
                <View className="w-16 h-16 rounded-full bg-tertiary items-center justify-center shadow-lg border-4 border-surface-container-lowest mb-2">
                  <MaterialIcons name="groups" size={32} color="white" />
                </View>
                <Text className="text-[10px] font-bold text-on-surface uppercase tracking-tighter text-center">
                  Community Hero
                </Text>
              </View>
              <View className="items-center w-[45%] opacity-40">
                <View className="w-16 h-16 rounded-full bg-surface-variant items-center justify-center shadow-inner mb-2">
                  <MaterialIcons name="eco" size={32} color="#595c5e" />
                </View>
                <Text className="text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter text-center">
                  Nature Scout
                </Text>
              </View>
              <View className="items-center w-[45%]">
                <View className="w-16 h-16 rounded-full border-2 border-dashed border-outline-variant items-center justify-center mb-2">
                  <MaterialIcons name="add" size={24} color="#abadaf" />
                </View>
                <Text className="text-[10px] font-bold text-outline-variant uppercase tracking-tighter text-center">
                  Locked
                </Text>
              </View>
            </View>
          </View>
          <View className="h-20" />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Profile;
