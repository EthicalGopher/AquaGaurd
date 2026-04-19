import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, SafeAreaView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { Link } from 'expo-router';
import Animated, { FadeInDown, useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();
  
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

  const handleSignIn = () => {
    signIn();
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="flex-1 px-8 justify-center">
          {/* Logo/Header Section */}
          <Animated.View 
            entering={FadeInDown.delay(200).springify()}
            className="mb-12 items-center"
          >
            <View className="w-20 h-20 bg-blue-600 rounded-3xl items-center justify-center shadow-xl shadow-blue-200 mb-6">
              <MaterialIcons name="water-drop" size={45} color="white" />
            </View>
            <Text className="text-4xl font-black text-slate-900 tracking-tight">AquaGaurd</Text>
            <Text className="text-slate-500 mt-2 font-medium text-lg text-center">Secure your water, guard our future.</Text>
          </Animated.View>

          <View className="space-y-5">
            {/* Email Input */}
            <Animated.View entering={FadeInDown.delay(400).springify()}>
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
            <Animated.View entering={FadeInDown.delay(600).springify()}>
              <Text className="text-slate-700 font-bold mb-2 ml-1">Password</Text>
              <View className="relative">
                <View className="absolute left-4 top-4 z-10">
                  <MaterialIcons name="lock-outline" size={20} color="#64748b" />
                </View>
                <TextInput
                  className="bg-white border border-slate-200 rounded-2xl px-12 py-4 text-slate-900 shadow-sm shadow-slate-100"
                  placeholder="Enter your password"
                  placeholderTextColor="#94a3b8"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>
              <TouchableOpacity className="mt-2 items-end">
                <Text className="text-blue-600 font-bold text-sm">Forgot Password?</Text>
              </TouchableOpacity>
            </Animated.View>

            {/* Sign In Button */}
            <Animated.View entering={FadeInDown.delay(800).springify()}>
              <AnimatedPressable
                style={[buttonAnimatedStyle]}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={handleSignIn}
                className="bg-blue-600 rounded-2xl py-5 shadow-lg shadow-blue-300 active:bg-blue-700"
              >
                <Text className="text-white text-center font-extrabold text-xl tracking-wide">Sign In</Text>
              </AnimatedPressable>
            </Animated.View>
          </View>

          {/* Footer */}
          <Animated.View 
            entering={FadeInDown.delay(1000).springify()}
            className="flex-row justify-center mt-12 items-center"
          >
            <Text className="text-slate-500 font-medium text-lg">New to AquaGaurd? </Text>
            <Link href="/(auth)/sign-up" asChild>
              <Pressable>
                <Text className="text-blue-600 font-black text-lg">Create Account</Text>
              </Pressable>
            </Link>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
