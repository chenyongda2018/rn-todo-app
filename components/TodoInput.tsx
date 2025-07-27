import { createHomeStyles } from '@/assets/styles/home.style';
import { api } from '@/convex/_generated/api';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { useMutation } from 'convex/react';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Alert, TextInput, TouchableOpacity, View } from 'react-native';

const TodoInput = () => {
    const { colors } = useTheme();

    const homeStyles = createHomeStyles(colors);

    const [newTodo, setNewTodo] = useState("")
    const addTodo = useMutation(api.todos.addTodo);

    const handleAddTodo = async () => {
        if (newTodo.trim()) {
            try {
                await addTodo({ text: newTodo.trim() })
                setNewTodo('');
            } catch (error) {
                console.log(error);
                Alert.alert("Error,failed to add new todo")
            }
        }
    }
    return (
        <View style={homeStyles.inputSection}>
            <View style={homeStyles.inputWrapper}>
                {/* 输入框 */}
                <TextInput style={homeStyles.input}
                    placeholder='What needs to be done?'
                    value={newTodo}
                    onChangeText={setNewTodo}
                    onSubmitEditing={handleAddTodo}
                    multiline
                    placeholderTextColor={colors.textMuted} />
                {/* 提交按钮 */}
                <TouchableOpacity onPress={handleAddTodo} activeOpacity={0.8} disabled={!newTodo.trim()}>
                    <LinearGradient colors={newTodo.trim() ? colors.gradients.primary : colors.gradients.muted}
                        style={[homeStyles.addButton, !newTodo.trim() && homeStyles.addButtonDisabled]}>
                        <Ionicons name='add' size={24} color="#fff" />
                    </LinearGradient>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default TodoInput