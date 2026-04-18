import TopBar from "@/components/topbar";
import { MaterialIcons } from "@expo/vector-icons";
import * as Location from 'expo-location';
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { 
  ActivityIndicator, 
  ScrollView, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View 
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from "react-native-maps";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { MOCK_REPORT_DETAILS } from "@/constants/mockData";

const MapScreen = () => {
  const router = useRouter();
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setLoading(false);
    })();
  }, []);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "Critical": return "#b31b25";
      case "High": return "#ff9800";
      case "Medium": return "#ffc107";
      default: return "#006b1b";
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-background">
        <TopBar />
        <View className="flex-1">
          {loading ? (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator size="large" color="#006289" />
              <Text className="mt-4 text-on-surface-variant font-bold">Locating you...</Text>
            </View>
          ) : (
            <View className="flex-1 relative">
              <MapView
                provider={PROVIDER_GOOGLE}
                style={StyleSheet.absoluteFillObject}
                initialRegion={{
                  latitude: location?.coords.latitude || 12.9352,
                  longitude: location?.coords.longitude || 77.6245,
                  latitudeDelta: 0.05,
                  longitudeDelta: 0.05,
                }}
                showsUserLocation
                showsMyLocationButton
              >
                {MOCK_REPORT_DETAILS.map((report) => (
                  <Marker
                    key={report.id}
                    coordinate={{
                      latitude: report.latitude,
                      longitude: report.longitude,
                    }}
                    pinColor={getImpactColor(report.impact)}
                  >
                    <Callout onPress={() => router.push(`/report/${report.id}`)}>
                      <View className="p-2 min-w-[150px]">
                        <Text className="font-bold text-on-surface">{report.title}</Text>
                        <Text className="text-xs text-on-surface-variant mb-1">{report.category}</Text>
                        <View className="flex-row items-center justify-between mt-1">
                          <Text 
                            className="text-[10px] font-black uppercase" 
                            style={{ color: getImpactColor(report.impact) }}
                          >
                            {report.impact} Impact
                          </Text>
                          <MaterialIcons name="chevron-right" size={16} color="#006289" />
                        </View>
                      </View>
                    </Callout>
                  </Marker>
                ))}
              </MapView>

              {/* Floating Area Info */}
              <View className="absolute top-6 left-6 right-6 bg-surface-container-lowest/90 p-4 rounded-2xl shadow-xl border border-outline-variant/10 flex-row items-center gap-4">
                <View className="bg-primary/10 p-2 rounded-xl">
                  <MaterialIcons name="explore" size={24} color="#006289" />
                </View>
                <View className="flex-1">
                  <Text className="text-[10px] font-black text-on-surface uppercase tracking-widest mb-0.5">
                    Live Monitoring
                  </Text>
                  <Text className="text-xs font-bold text-on-surface-variant leading-tight">
                    Displaying {MOCK_REPORT_DETAILS.length} active incidents near your area.
                  </Text>
                </View>
              </View>

              {/* Legend Overlay */}
              <View className="absolute bottom-10 left-6 bg-surface-container-lowest/90 p-4 rounded-2xl shadow-xl border border-outline-variant/10">
                <Text className="text-[10px] font-black text-on-surface uppercase mb-3 tracking-wider">Legend</Text>
                <View className="flex-col gap-3">
                  <View className="flex-row items-center gap-2">
                    <View className="w-3 h-3 rounded-full bg-[#b31b25]" />
                    <Text className="text-[10px] font-bold text-on-surface-variant">Critical</Text>
                  </View>
                  <View className="flex-row items-center gap-2">
                    <View className="w-3 h-3 rounded-full bg-[#ff9800]" />
                    <Text className="text-[10px] font-bold text-on-surface-variant">High</Text>
                  </View>
                  <View className="flex-row items-center gap-2">
                    <View className="w-3 h-3 rounded-full bg-[#ffc107]" />
                    <Text className="text-[10px] font-bold text-on-surface-variant">Moderate</Text>
                  </View>
                  <View className="flex-row items-center gap-2">
                    <View className="w-3 h-3 rounded-full bg-[#006b1b]" />
                    <Text className="text-[10px] font-bold text-on-surface-variant">Low</Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default MapScreen;
