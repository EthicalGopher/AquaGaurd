import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

import { MOCK_REPORT_DETAILS } from "@/constants/mockData";
import { Comment } from "@/constants/types";

const ReportDetails = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const initialReport = MOCK_REPORT_DETAILS.find((item) => item.id === id);
  const [report, setReport] = useState(initialReport);
  const [newComment, setNewComment] = useState("");

  if (!report) {
    return (
      <SafeAreaView className="flex-1 bg-[#f5f7f9] items-center justify-center">
        <Text className="text-on-surface font-bold">Report not found</Text>
        <TouchableOpacity 
          onPress={() => router.back()}
          className="mt-4 bg-[#006289] px-6 py-2 rounded-full"
        >
          <Text className="text-white font-bold">Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `AquaGuard Report: ${report.title}\nLocation: ${report.location}\nStatus: ${report.status}\n\nCheck out this water quality report on AquaGuard!`,
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleAddComment = () => {
    if (newComment.trim() === "") return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: "You",
      text: newComment,
      time: "Just now",
    };

    setReport({
      ...report,
      comments: [...report.comments, comment],
    });
    setNewComment("");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#f5f7f9]" edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 80}
      >
        {/* Top Bar with Back Button */}
        <View className="flex-row items-center px-6 py-5 bg-white shadow-sm gap-4">
          <TouchableOpacity onPress={() => router.back()} className="p-1">
            <MaterialIcons name="arrow-back" size={24} color="#006289" />
          </TouchableOpacity>
          <Text className="font-headline font-extrabold text-xl text-[#006289] tracking-tighter flex-1">
            Report Details
          </Text>
          <TouchableOpacity onPress={onShare} className="bg-[#f5f7f9] p-2 rounded-full">
            <MaterialIcons name="share" size={24} color="#2c2f31" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          {/* Map Section */}
          <View className="h-[300px] w-full relative">
            <MapView
              provider={PROVIDER_GOOGLE}
              style={StyleSheet.absoluteFillObject}
              region={{
                latitude: report.latitude,
                longitude: report.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              scrollEnabled={false}
              zoomEnabled={false}
            >
              <Marker
                coordinate={{
                  latitude: report.latitude,
                  longitude: report.longitude,
                }}
              >
                <View className="bg-white p-2 rounded-full shadow-xl border-2 border-[#006289]">
                  <MaterialIcons name="location-on" size={24} color="#b31b25" />
                </View>
              </Marker>
            </MapView>
            <View className="absolute bottom-4 right-4 bg-white/90 px-4 py-2 rounded-full shadow-md">
              <Text className="text-[10px] font-bold text-[#006289] uppercase tracking-widest">
                Exact Location
              </Text>
            </View>
          </View>

          {/* Content Section */}
          <View className="px-6 py-8">
            <View className="flex-row justify-between items-start mb-6">
              <View className="flex-1 mr-4">
                <Text className="text-2xl font-black text-on-surface leading-tight">
                  {report.title}
                </Text>
                <View className="flex-row items-center gap-1 mt-2">
                  <MaterialIcons name="location-on" size={14} color="#595c5e" />
                  <Text className="text-on-surface-variant font-medium text-sm">
                    {report.location}
                  </Text>
                </View>
              </View>
              <View className="bg-[#006289] px-4 py-2 rounded-2xl shadow-sm">
                <Text className="text-white font-black text-xs uppercase">
                  {report.status}
                </Text>
              </View>
            </View>

            <View className="flex-row gap-4 mb-8">
              <View className="flex-1 bg-white p-4 rounded-3xl border border-[#eef1f3] shadow-sm">
                <Text className="text-[10px] font-bold text-on-surface-variant uppercase mb-1">Category</Text>
                <Text className="font-bold text-[#006b1b]">{report.category}</Text>
              </View>
              <View className="flex-1 bg-white p-4 rounded-3xl border border-[#eef1f3] shadow-sm">
                <Text className="text-[10px] font-bold text-on-surface-variant uppercase mb-1">Impact</Text>
                <Text className="font-bold text-[#b31b25]">{report.impact}</Text>
              </View>
            </View>

            <View className="bg-white p-6 rounded-[32px] border border-[#eef1f3] shadow-sm mb-8">
              <Text className="text-lg font-bold text-on-surface mb-4">Quality Parameters</Text>
              <View className="flex-row justify-between">
                <View className="items-center">
                  <Text className="text-2xl font-black text-[#b31b25]">{report.ph || "N/A"}</Text>
                  <Text className="text-[10px] font-bold text-on-surface-variant uppercase">pH Level</Text>
                </View>
                <View className="w-[1px] bg-[#f5f7f9]" />
                <View className="items-center">
                  <Text className="text-2xl font-black text-[#02aeef]">{report.turbidity || "N/A"}</Text>
                  <Text className="text-[10px] font-bold text-on-surface-variant uppercase">Turbidity</Text>
                </View>
                <View className="w-[1px] bg-[#f5f7f9]" />
                <View className="items-center">
                  <Text className="text-2xl font-black text-[#006b1b]">{report.tds || "N/A"}</Text>
                  <Text className="text-[10px] font-bold text-on-surface-variant uppercase">TDS (PPM)</Text>
                </View>
              </View>
            </View>

            <View className="mb-8">
              <Text className="text-lg font-bold text-on-surface mb-3">Description</Text>
              <Text className="text-on-surface-variant leading-6 text-base">
                {report.description}
              </Text>
            </View>

            {report.media.length > 0 && (
              <View className="mb-8">
                <Text className="text-lg font-bold text-on-surface mb-4">Evidence Attachments</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
                  {report.media.map((item, index) => (
                    <View key={index} className="w-64 h-48 rounded-3xl overflow-hidden border border-[#eef1f3] shadow-sm">
                      {item.type === 'image' ? (
                        <Image 
                          source={{ uri: item.uri }} 
                          style={{ width: '100%', height: '100%' }} 
                          contentFit="cover" 
                        />
                      ) : (
                        <View className="w-full h-full items-center justify-center bg-[#70f8e810]">
                          <MaterialIcons name="movie" size={48} color="#005a53" />
                        </View>
                      )}
                    </View>
                  ))}
                </ScrollView>
              </View>
            )}

            <View className="flex-row items-center gap-4 p-5 bg-[#e8f4ff] rounded-3xl border border-[#2dbcfe20] mb-10">
              <View className="w-12 h-12 bg-white rounded-full items-center justify-center shadow-sm">
                <MaterialIcons name="person" size={24} color="#006289" />
              </View>
              <View>
                <Text className="text-[10px] font-bold text-[#006289] uppercase">Reported By</Text>
                <Text className="font-bold text-on-surface">{report.author}</Text>
                <Text className="text-xs text-on-surface-variant">{report.time}</Text>
              </View>
            </View>

            {/* Comments Section */}
            <View className="pb-32">
              <Text className="text-xl font-black text-on-surface mb-6">Comments ({report.comments.length})</Text>
              
              <View className="mb-8">
                {report.comments.map((comment) => (
                  <View key={comment.id} className="flex-row gap-4 mb-6">
                    <View className="w-10 h-10 bg-surface-container-high rounded-full items-center justify-center">
                      <MaterialIcons name="person" size={20} color="#595c5e" />
                    </View>
                    <View className="flex-1 bg-white p-4 rounded-2xl rounded-tl-none border border-[#eef1f3] shadow-sm">
                      <View className="flex-row justify-between items-center mb-1">
                        <Text className="font-bold text-sm text-on-surface">{comment.author}</Text>
                        <Text className="text-[10px] text-on-surface-variant font-medium">{comment.time}</Text>
                      </View>
                      <Text className="text-on-surface-variant text-sm leading-5">
                        {comment.text}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>

              {/* Add Comment Input */}
              <View className="flex-row items-center gap-3 bg-white p-2 pl-5 rounded-full border border-[#eef1f3] shadow-lg mb-4">
                <TextInput
                  placeholder="Add a helpful comment..."
                  className="flex-1 h-12 text-on-surface font-medium"
                  value={newComment}
                  onChangeText={setNewComment}
                  multiline={false}
                />
                <TouchableOpacity 
                  onPress={handleAddComment}
                  className="w-10 h-10 bg-[#006289] rounded-full items-center justify-center"
                  activeOpacity={0.7}
                >
                  <MaterialIcons name="send" size={18} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ReportDetails;
