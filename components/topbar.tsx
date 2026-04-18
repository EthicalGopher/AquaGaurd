import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

export default function TopBar() {
  return (
    <View className="flex-row justify-between items-center px-6 py-4 bg-background/70 border-b border-outline-variant/5">
      <View className="flex-row items-center gap-2">
        <MaterialIcons name="water-drop" size={24} color="#006289" />
        <Text className="text-[#006289] font-black italic tracking-tighter text-lg">
          AquaGuard
        </Text>
      </View>
      <TouchableOpacity className="p-2">
        <MaterialIcons name="notifications-none" size={24} color="#2c2f31" />
      </TouchableOpacity>
    </View>
  );
}
