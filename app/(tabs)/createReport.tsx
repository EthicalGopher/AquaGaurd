import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

interface MediaItem {
  uri: string;
  type: 'image' | 'video';
}

type ImpactLevel = 'Low' | 'Medium' | 'High' | 'Critical';

interface FormData {
  location: string;
  latitude: number | null;
  longitude: number | null;
  category: string;
  ph: string;
  turbidity: string;
  tds: string;
  source: string;
  waterColor: string;
  odor: string;
  description: string;
  impact: ImpactLevel;
  media: MediaItem[];
}

const initialFormData: FormData = {
  location: "Koramangala, Bengaluru",
  latitude: 12.9352, // Default Bengaluru coords
  longitude: 77.6245,
  category: "",
  ph: "",
  turbidity: "",
  tds: "",
  source: "Residential Tap",
  waterColor: "Clear / Colorless",
  odor: "",
  description: "",
  impact: "Low",
  media: [],
};

const CreateReport = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  useEffect(() => {
    if (currentStep === 1) {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission to access location was denied');
          return;
        }
        getCurrentLocation();
      })();
    }
  }, [currentStep]);

  const getCurrentLocation = async () => {
    setLoadingLocation(true);
    try {
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      
      // Get readable address
      let reverseGeocode = await Location.reverseGeocodeAsync({
        latitude,
        longitude
      });
      
      if (reverseGeocode.length > 0) {
        const addr = reverseGeocode[0];
        const readableAddress = `${addr.name || ''}, ${addr.district || addr.city || ''}, ${addr.region || ''}`.replace(/^, /, '');
        setFormData(prev => ({
          ...prev,
          latitude,
          longitude,
          location: readableAddress || "Current Location"
        }));
      }
    } catch (error) {
      console.log("Error getting location", error);
    } finally {
      setLoadingLocation(false);
    }
  };

  const pickMedia = async (mediaType: 'image' | 'video') => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: mediaType === 'image' ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled) {
      const newMedia: MediaItem = {
        uri: result.assets[0].uri,
        type: mediaType,
      };
      setFormData(prev => ({
        ...prev,
        media: [...prev.media, newMedia],
      }));
    }
  };

  const removeMedia = (index: number) => {
    setFormData((prev) => {
      const currentMedia = prev.media || [];
      return {
        ...prev,
        media: currentMedia.filter((_, i) => i !== index),
      };
    });
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setCurrentStep(1);
    // Refresh location on reset
    getCurrentLocation();
  };

  const handleSubmit = () => {
    Alert.alert(
      "Report Submitted",
      "Thank you for reporting the issue. Our team will look into it shortly.",
      [
        {
          text: "OK",
          onPress: () => resetForm(),
        },
      ]
    );
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const updateFormData = (key: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // --- STEP RENDERERS ---

  const renderStep1 = () => (
    <View className="flex flex-col gap-6">
      <Text className="text-2xl font-bold text-[#006289]">Where is the issue?</Text>
      
      <View className="h-[350px] w-full bg-[#e8f4ff] rounded-[32px] overflow-hidden border-2 border-[#2dbcfe20] shadow-sm relative">
        {formData.latitude && formData.longitude ? (
          <MapView
            provider={PROVIDER_GOOGLE}
            style={StyleSheet.absoluteFillObject}
            region={{
              latitude: formData.latitude,
              longitude: formData.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
            onPress={(e) => {
              const { latitude, longitude } = e.nativeEvent.coordinate;
              updateFormData('latitude', latitude);
              updateFormData('longitude', longitude);
            }}
          >
            <Marker
              coordinate={{
                latitude: formData.latitude,
                longitude: formData.longitude,
              }}
              draggable
              onDragEnd={(e) => {
                const { latitude, longitude } = e.nativeEvent.coordinate;
                updateFormData('latitude', latitude);
                updateFormData('longitude', longitude);
              }}
            >
              <View className="bg-white p-2 rounded-full shadow-xl border-2 border-[#006289]">
                <MaterialIcons name="water-drop" size={24} color="#006289" />
              </View>
            </Marker>
          </MapView>
        ) : (
          <View className="w-full h-full items-center justify-center">
            <ActivityIndicator size="large" color="#006289" />
            <Text className="mt-4 text-[#006289] font-bold">Initializing Map...</Text>
          </View>
        )}

        <TouchableOpacity 
          onPress={getCurrentLocation}
          className="absolute bottom-6 right-6 bg-white p-4 rounded-2xl shadow-xl border border-[#eef1f3] z-10"
        >
          {loadingLocation ? (
            <ActivityIndicator size="small" color="#006289" />
          ) : (
            <MaterialIcons name="my-location" size={24} color="#006289" />
          )}
        </TouchableOpacity>
      </View>

      <View className="p-5 bg-white rounded-[24px] border-2 border-[#eef1f3] flex-row items-center gap-4 shadow-sm">
        <View className="bg-[#2dbcfe20] p-3 rounded-xl">
          <MaterialIcons name="location-on" size={24} color="#006289" />
        </View>
        <View className="flex-1">
          <Text className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-0.5">Report Address</Text>
          <TextInput
            className="text-on-surface font-bold text-[16px] p-0"
            value={formData.location}
            onChangeText={(val) => updateFormData('location', val)}
            multiline
          />
        </View>
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View className="flex flex-col gap-6">
      <Text className="text-2xl font-bold text-[#006b1b]">What&apos;s the category?</Text>
      <View className="flex-row flex-wrap gap-3">
        {[
          { label: "Discoloration", icon: "palette", color: "#83e881" },
          { label: "Bad Smell", icon: "air", color: "#60e9da" },
          { label: "Low Pressure", icon: "speed", color: "#2dbcfe" },
          { label: "Leakage", icon: "water-damage", color: "#fb5151" },
          { label: "Other", icon: "more-horiz", color: "#abadaf" },
        ].map((item) => (
          <TouchableOpacity
            key={item.label}
            onPress={() => updateFormData("category", item.label)}
            className={`px-4 py-5 rounded-3xl border-2 flex-1 min-w-[140px] flex-row items-center gap-3 ${
              formData.category === item.label 
                ? "bg-white border-[#006b1b]" 
                : "bg-white border-[#eef1f3]"
            }`}
            style={formData.category === item.label ? { shadowColor: item.color, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 12, elevation: 5 } : {}}
          >
            <View className="p-2 rounded-xl" style={{ backgroundColor: item.color + '20' }}>
              <MaterialIcons name={item.icon as any} size={20} color={formData.category === item.label ? '#006b1b' : '#595c5e'} />
            </View>
            <Text className={`font-bold flex-1 ${formData.category === item.label ? "text-[#006b1b]" : "text-on-surface-variant"}`}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <Text className="text-lg font-bold text-[#006b1b] mt-4">Evidence Attachments</Text>
      <View className="flex-row gap-4">
        <TouchableOpacity 
          onPress={() => pickMedia('image')}
          className="flex-1 h-32 bg-[#91f78e10] rounded-3xl border-2 border-dashed border-[#83e881] items-center justify-center"
        >
          <View className="bg-white p-3 rounded-2xl shadow-sm">
            <MaterialIcons name="add-a-photo" size={28} color="#006b1b" />
          </View>
          <Text className="mt-2 text-[10px] text-[#006b1b] font-extrabold uppercase tracking-wider">Add Image</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={() => pickMedia('video')}
          className="flex-1 h-32 bg-[#70f8e810] rounded-3xl border-2 border-dashed border-[#60e9da] items-center justify-center"
        >
          <View className="bg-white p-3 rounded-2xl shadow-sm">
            <MaterialIcons name="videocam" size={28} color="#005a53" />
          </View>
          <Text className="mt-2 text-[10px] text-[#005a53] font-extrabold uppercase tracking-wider">Add Video</Text>
        </TouchableOpacity>
      </View>

      {/* Selected Media Preview */}
      <View className="flex-row flex-wrap gap-3 mt-2">
        {(formData.media || []).map((item, index) => (
          <View key={index} className="w-24 h-24 bg-white border border-[#eef1f3] rounded-2xl overflow-hidden relative shadow-sm">
            {item.type === 'image' ? (
              <Image 
                source={item.uri} 
                style={{ width: '100%', height: '100%' }} 
                contentFit="cover" 
              />
            ) : (
              <View className="w-full h-full items-center justify-center bg-[#70f8e810]">
                <MaterialIcons name="movie" size={32} color="#005a53" />
              </View>
            )}
            <TouchableOpacity 
              onPress={() => removeMedia(index)}
              className="absolute top-1 right-1 bg-[#b31b25] w-6 h-6 rounded-full items-center justify-center shadow-md z-10"
            >
              <MaterialIcons name="close" size={14} color="white" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View className="flex flex-col gap-6">
      <Text className="text-2xl font-bold text-[#b31b25]">Quality Parameters</Text>
      {/* pH Field */}
      <View className="bg-[#ffefee] p-6 rounded-3xl border border-[#fb515120] flex flex-col gap-4">
        <View className="flex flex-col gap-2">
          <Text className="text-[10px] font-bold text-[#b31b25] uppercase ml-1 tracking-widest">pH Level</Text>
          <View className="relative flex-row items-center">
            <TextInput
              className="flex-1 bg-white rounded-2xl py-4 px-5 text-on-surface font-bold text-lg shadow-sm"
              placeholder="7.0"
              keyboardType="numeric"
              value={formData.ph}
              onChangeText={(val) => updateFormData("ph", val)}
            />
            <View className="absolute right-4 bg-[#fb515120] px-3 py-1 rounded-lg">
              <Text className="text-[10px] font-bold text-[#b31b25]">PH</Text>
            </View>
          </View>
        </View>
        {/* Turbidity */}
        <View className="flex flex-col gap-2">
          <Text className="text-[10px] font-bold text-[#b31b25] uppercase ml-1 tracking-widest">Turbidity (NTU)</Text>
          <View className="relative flex-row items-center">
            <TextInput
              className="flex-1 bg-white rounded-2xl py-4 px-5 text-on-surface font-bold text-lg shadow-sm"
              placeholder="0.0"
              keyboardType="numeric"
              value={formData.turbidity}
              onChangeText={(val) => updateFormData("turbidity", val)}
            />
            <View className="absolute right-4 bg-[#fb515120] px-3 py-1 rounded-lg">
              <Text className="text-[10px] font-bold text-[#b31b25]">NTU</Text>
            </View>
          </View>
        </View>
      </View>
      <View className="bg-white p-4 rounded-2xl flex-row items-center gap-3 border border-[#eef1f3]">
        <MaterialIcons name="info" size={24} color="#b31b25" />
        <Text className="text-xs text-on-surface-variant leading-5">
          Provide accurate readings if available. These help our technicians diagnose the issue faster.
        </Text>
      </View>
    </View>
  );

  const renderStep4 = () => (
    <View className="flex flex-col gap-6">
      <Text className="text-2xl font-bold text-[#006289]">Impact & Details</Text>
      <View className="flex flex-col gap-2">
        <Text className="text-[10px] font-bold text-on-surface-variant uppercase ml-1 tracking-widest">Urgency Level</Text>
        <View className="flex-row gap-2">
          {[
            { label: 'Low', color: '#83e881' },
            { label: 'Medium', color: '#ffc107' },
            { label: 'High', color: '#ff9800' },
            { label: 'Critical', color: '#f44336' }
          ].map((lvl) => (
            <TouchableOpacity
              key={lvl.label}
              onPress={() => updateFormData("impact", lvl.label as ImpactLevel)}
              className={`flex-1 py-4 rounded-2xl border-2 items-center ${
                formData.impact === lvl.label 
                  ? "bg-white border-[#006289]" 
                  : "bg-white border-[#eef1f3]"
              }`}
            >
              <View className="w-2 h-2 rounded-full mb-1" style={{ backgroundColor: lvl.color }} />
              <Text className={`font-bold text-[10px] ${formData.impact === lvl.label ? "text-[#006289]" : "text-on-surface-variant"}`}>{lvl.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View className="bg-white rounded-3xl p-2 border-2 border-[#eef1f3]">
        <TextInput
          className="w-full py-4 px-5 text-on-surface font-medium min-h-[150px]"
          placeholder="Describe the issue in detail..."
          multiline
          textAlignVertical="top"
          value={formData.description}
          onChangeText={(val) => updateFormData("description", val)}
        />
      </View>
    </View>
  );

  const renderStep5 = () => (
    <View className="flex flex-col gap-6">
      <Text className="text-2xl font-bold text-[#006289]">Final Verification</Text>
      <View className="bg-white p-8 rounded-[40px] border-2 border-[#eef1f3] shadow-sm flex flex-col gap-6">
        <View className="flex-row items-center gap-4">
          <View className="bg-[#e8f4ff] p-3 rounded-2xl">
            <MaterialIcons name="location-on" size={24} color="#006289" />
          </View>
          <View>
            <Text className="text-[10px] font-bold text-on-surface-variant uppercase">Location</Text>
            <Text className="font-bold text-on-surface text-lg">{formData.location}</Text>
          </View>
        </View>

        <View className="flex-row gap-8">
          <View className="flex-1">
            <Text className="text-[10px] font-bold text-on-surface-variant uppercase mb-1">Type</Text>
            <View className="bg-[#91f78e20] px-3 py-1 rounded-full self-start">
              <Text className="font-bold text-[#006b1b] text-xs">{formData.category || "None"}</Text>
            </View>
          </View>
          <View className="flex-1">
            <Text className="text-[10px] font-bold text-on-surface-variant uppercase mb-1">Impact</Text>
            <View className="bg-[#fb515120] px-3 py-1 rounded-full self-start">
              <Text className="font-bold text-[#b31b25] text-xs">{formData.impact}</Text>
            </View>
          </View>
        </View>

        <View className="h-[2px] bg-[#f5f7f9]" />

        <View className="flex-row justify-between">
          <View className="items-center">
            <Text className="text-[24px] font-bold text-on-surface">{formData.ph || "7.0"}</Text>
            <Text className="text-[10px] font-bold text-[#b31b25] uppercase tracking-tighter">pH Level</Text>
          </View>
          <View className="items-center">
            <Text className="text-[24px] font-bold text-on-surface">{formData.turbidity || "0.0"}</Text>
            <Text className="text-[10px] font-bold text-[#02aeef] uppercase tracking-tighter">Turbidity</Text>
          </View>
          <View className="items-center">
            <Text className="text-[24px] font-bold text-on-surface">{formData.tds || "120"}</Text>
            <Text className="text-[10px] font-bold text-[#006b1b] uppercase tracking-tighter">TDS (PPM)</Text>
          </View>
        </View>
      </View>
      
      <View className="bg-[#2dbcfe10] p-5 rounded-3xl flex-row items-center gap-4 border border-[#2dbcfe20]">
        <MaterialIcons name="verified-user" size={28} color="#006289" />
        <Text className="text-[11px] text-[#006289] font-bold flex-1 leading-4">
          Report will be encrypted and sent to the nearest municipal water authority.
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#f5f7f9]">
      {/* Top Bar */}
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

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-6">
        {/* Colorful Progress Tracker */}
        <View className="mt-8 mb-10">
          <View className="flex flex-col gap-5">
            <View className="flex-row justify-between items-center px-1">
              <View className="bg-[#006289] px-3 py-1 rounded-full">
                <Text className="text-[10px] font-bold text-white uppercase tracking-widest">Step {currentStep} / 5</Text>
              </View>
              <Text className="text-xs font-black text-[#006289] italic">{currentStep * 20}%</Text>
            </View>
            <View className="flex-row gap-1.5 h-3 w-full bg-white rounded-full p-1 shadow-inner">
              {[1, 2, 3, 4, 5].map((s) => (
                <View
                  key={s}
                  className={`flex-1 h-full rounded-full ${
                    s < currentStep ? "bg-[#91f78e]" : 
                    s === currentStep ? "bg-[#006289]" : 
                    "bg-[#eef1f3]"
                  }`}
                />
              ))}
            </View>
          </View>
        </View>

        {/* Dynamic Step Content */}
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
        {currentStep === 5 && renderStep5()}

        {/* Navigation Buttons */}
        <View className="mt-12 flex-row items-center justify-between gap-4 pb-16">
          <TouchableOpacity
            onPress={prevStep}
            disabled={currentStep === 1}
            className={`flex-1 py-5 rounded-[25px] flex-row items-center justify-center gap-2 ${
              currentStep === 1 ? "bg-[#eef1f3] opacity-40" : "bg-white border-2 border-[#eef1f3]"
            }`}
          >
            <MaterialIcons name="arrow-back" size={18} color={currentStep === 1 ? "#999" : "#006289"} />
            <Text className={`font-black text-sm uppercase ${currentStep === 1 ? "text-[#abadaf]" : "text-[#006289]"}`}>
              Back
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={currentStep === 5 ? handleSubmit : nextStep}
            className="flex-[2] py-5 bg-[#006289] rounded-[25px] flex-row items-center justify-center gap-2 shadow-xl shadow-[#00628940]"
          >
            <Text className="text-white font-black text-sm uppercase tracking-widest">
              {currentStep === 5 ? "Submit" : "Next"}
            </Text>
            <MaterialIcons name={currentStep === 5 ? "verified" : "arrow-forward"} size={18} color="white" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateReport;
