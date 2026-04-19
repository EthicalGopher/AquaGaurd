import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { Link } from 'expo-router';
import Animated, { FadeInDown, useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signUp } = useAuth();

  const scale = useSharedValue(1);

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.96);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const handleSignUp = () => {
    signUp();
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          className="px-8"
        >
          <View className="flex-1 justify-center py-12">
            {/* Header Section */}
            <Animated.View 
              entering={FadeInDown.delay(200).springify()}
              className="mb-10"
            >
              <TouchableOpacity 
                onPress={() => {}} // Could be a back button if needed
                className="w-12 h-12 bg-white rounded-2xl items-center justify-center shadow-sm border border-slate-100 mb-8"
              >
                <Link href="/(auth)/sign-in" asChild>
                  <MaterialIcons name="arrow-back" size={24} color="#0f172a" />
                </Link>
              </TouchableOpacity>
              <Text className="text-4xl font-black text-slate-900 tracking-tight">Create Account</Text>
              <Text className="text-slate-500 mt-2 font-medium text-lg">Join the mission to protect our water resources.</Text>
            </Animated.View>

            <View className="space-y-5">
              {/* Name Input */}
              <Animated.View entering={FadeInDown.delay(400).springify()}>
                <Text className="text-slate-700 font-bold mb-2 ml-1">Full Name</Text>
                <View className="relative">
                  <View className="absolute left-4 top-4 z-10">
                    <MaterialIcons name="person-outline" size={20} color="#64748b" />
                  </View>
                  <TextInput
                    className="bg-white border border-slate-200 rounded-2xl px-12 py-4 text-slate-900 shadow-sm shadow-slate-100"
                    placeholder="John Doe"
                    placeholderTextColor="#94a3b8"
                    value={name}
                    onChangeText={setName}
                  />
                </View>
              </Animated.View>

              {/* Email Input */}
              <Animated.View entering={FadeInDown.delay(600).springify()}>
                <Text className="text-slate-700 font-bold mb-2 ml-1">Email Address</Text>
                <View className="relative">
                  <View className="absolute left-4 top-4 z-10">
                    <MaterialIcons name="mail-outline" size={20} color="#64748b" />
                  </View>
                  <TextInput
                    className="bg-white border border-slate-200 rounded-2xl px-12 py-4 text-slate-900 shadow-sm shadow-slate-100"
                    placeholder="name@example.com"
                    placeholderTextColor="#94a3b8"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                </View>
              </Animated.View>

              {/* Password Input */}
              <Animated.View entering={FadeInDown.delay(800).springify()}>
                <Text className="text-slate-700 font-bold mb-2 ml-1">Password</Text>
                <View className="relative">
                  <View className="absolute left-4 top-4 z-10">
                    <MaterialIcons name="lock-outline" size={20} color="#64748b" />
                  </View>
                  <TextInput
                    className="bg-white border border-slate-200 rounded-2xl px-12 py-4 text-slate-900 shadow-sm shadow-slate-100"
                    placeholder="Create a strong password"
                    placeholderTextColor="#94a3b8"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                </View>
              </Animated.View>

              {/* Sign Up Button */}
              <Animated.View entering={FadeInDown.delay(1000).springify()} className="pt-4">
                <AnimatedPressable
                  style={[buttonAnimatedStyle]}
                  onPressIn={handlePressIn}
                  onPressOut={handlePressOut}
                  onPress={handleSignUp}
                  className="bg-blue-600 rounded-2xl py-5 shadow-lg shadow-blue-300"
                >
                  <Text className="text-white text-center font-extrabold text-xl tracking-wide">Create Account</Text>
                </AnimatedPressable>
              </Animated.View>
            </View>

            {/* Footer */}
            <Animated.View 
              entering={FadeInDown.delay(1200).springify()}
              className="flex-row justify-center mt-12 items-center"
            >
              <Text className="text-slate-500 font-medium text-lg">Already have an account? </Text>
              <Link href="/(auth)/sign-in" asChild>
                <Pressable>
                  <Text className="text-blue-600 font-black text-lg">Sign In</Text>
                </Pressable>
              </Link>
            </Animated.View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
