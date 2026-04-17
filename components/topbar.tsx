import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

export default function TopBar() {
  return (
    <View className="flex-row justify-between items-center px-6 py-5 bg-white shadow-sm">
      <View className="flex-row items-center gap-3">
        <View className="bg-[#006289] p-2 rounded-xl">
          <MaterialIcons name="water-drop" size={20} color="white" />
        </View>
        <Text className="font-headline font-extrabold text-xl text-[#006289] tracking-tighter">
          AquaGuard
        </Text>
      </View>
      <TouchableOpacity className="bg-[#f5f7f9] p-2 rounded-full">
        <MaterialIcons name="notifications-none" size={24} color="#2c2f31" />
      </TouchableOpacity>
    </View>
  );
}
