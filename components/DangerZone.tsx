import { createSettingsStyles } from '@/assets/styles/settings.style';
import { api } from '@/convex/_generated/api';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { useMutation } from 'convex/react';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';

const DangerZone = () => {
    const { colors } = useTheme();
    const settingStyles = createSettingsStyles(colors);

    const clearAllTodos = useMutation(api.todos.clearAllTodo)

    const handleClearAllTodos = () => {
        Alert.alert(
            "Reset App",
            "⚠️Are you sure want to delele all todos?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete All", style: "destructive",
                    onPress: async () => {
                        try {
                            const result = await clearAllTodos();
                            Alert.alert(
                                "App reset",
                                result.deleteCount > 0 ?
                                `Successfully deleted ${result.deleteCount} todo${result.deleteCount === 1 ? "" : "s"}.Your app has been reset.`
                                :"Your app has been reset."
                            );

                        } catch (error) {
                            console.log("Error in reset app", error);
                            Alert.alert(
                                "Error",
                                "Failed to reset app."
                            );
                        }
                    }
                },
            ]
        )
    }

    return (
        <LinearGradient colors={colors.gradients.surface}
            style={[settingStyles.section, { borderLeftColor: colors.primary }]}>
            <Text style={settingStyles.sectionTitleDanger}>Danger Zone</Text>

            {/* darkMode */}
            <TouchableOpacity onPress={handleClearAllTodos} style={settingStyles.actionButton}>
                <View style={settingStyles.settingItem}>
                    <View style={settingStyles.settingLeft}>
                        <LinearGradient colors={colors.gradients.danger}
                            style={settingStyles.actionIcon}>
                            <Ionicons name='trash' size={18} color="#fff" />
                        </LinearGradient>

                        <Text style={settingStyles.actionTextDanger}>Reset App</Text>
                    </View>
                    <Ionicons name='chevron-forward' size={18} color={colors.textMuted} />
                </View>
            </TouchableOpacity>
        </LinearGradient>
    )
}

export default DangerZone