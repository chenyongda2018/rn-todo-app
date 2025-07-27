import { createSettingsStyles } from '@/assets/styles/settings.style'
import useTheme from '@/hooks/useTheme'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useState } from 'react'
import { Switch, Text, View } from 'react-native'

const Preference = () => {
    const [isAutuSync, setIsAutoSync] = useState(false)
    const [isNotifyEnabled, setIsNotifyEnabled] = useState(false)
    const { isDarkMode, toggleDarkMode, colors } = useTheme();

    const settingStyles = createSettingsStyles(colors);

    const toggleAutoSync = () => {
        setIsAutoSync(!isAutuSync)
    }

    const toggleNotification = () => {
        setIsNotifyEnabled(!isNotifyEnabled)
    }

    return (
        <LinearGradient colors={colors.gradients.surface}
            style={[settingStyles.section, { borderLeftColor: colors.primary }]}>
            <Text style={settingStyles.sectionTitle}>Preference</Text>
            {/* darkMode */}
            <View style={settingStyles.settingItem}>
                <View style={settingStyles.settingLeft}>
                    <LinearGradient colors={colors.gradients.primary}
                        style={settingStyles.settingIcon}>
                        <Ionicons name='moon' size={18} color="#fff" />
                    </LinearGradient>

                    <Text style={settingStyles.settingText}>Dark Mode</Text>
                </View>
                <Switch value={isDarkMode} onValueChange={toggleDarkMode} thumbColor="#fff" />
            </View>

            {/* autosync */}
            <View style={settingStyles.settingItem}>
                <View style={settingStyles.settingLeft}>
                    <LinearGradient colors={colors.gradients.success}
                        style={settingStyles.settingIcon}>
                        <Ionicons name='moon' size={18} color="#fff" />
                    </LinearGradient>

                    <Text style={settingStyles.settingText}>Auto sync</Text>
                </View>
                <Switch value={isAutuSync} onValueChange={toggleAutoSync} thumbColor="#fff" />
            </View>

            {/* notification */}
            <View style={settingStyles.settingItem}>
                <View style={settingStyles.settingLeft}>
                    <LinearGradient colors={colors.gradients.warning}
                        style={settingStyles.settingIcon}>
                        <Ionicons name='moon' size={18} color="#fff" />
                    </LinearGradient>

                    <Text style={settingStyles.settingText}>Notification</Text>
                </View>
                <Switch value={isNotifyEnabled} onValueChange={toggleNotification} thumbColor="#fff" />
            </View>
        </LinearGradient>
    )
}

export default Preference