import { createSettingsStyles } from '@/assets/styles/settings.style';
import DangerZone from '@/components/DangerZone';
import Preference from '@/components/Preference';
import ProgressStats from '@/components/ProgressStats';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

const SettingsScreen = () => {

  const { colors } = useTheme();
  const settingStyles = createSettingsStyles(colors);

  return (
    <LinearGradient colors={colors.gradients.background} style={settingStyles.container}>
      <SafeAreaView style={settingStyles.safeArea}>
        <View style={settingStyles.header}>
          <View style={settingStyles.titleContainer}>
            <LinearGradient colors={colors.gradients.primary} style={settingStyles.iconContainer}>
              <Ionicons name='settings' size={28} color="#ffffff" />
            </LinearGradient>
            <Text style={settingStyles.title}>Settings</Text>
          </View>
        </View>

        <ScrollView
          style={settingStyles.scrollView}
          contentContainerStyle={settingStyles.content}
          showsVerticalScrollIndicator={false}
        >
          <ProgressStats />
          <Preference />
          <DangerZone />
        </ScrollView>

      </SafeAreaView>
    </LinearGradient>
  )
}

export default SettingsScreen