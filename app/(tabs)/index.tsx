import { createHomeStyles } from "@/assets/styles/home.style";
import EmptyState from "@/components/EmptyState";
import Header from "@/components/Header";
import LoadingSpinner from "@/components/LoadingSpinner";
import TodoInput from "@/components/TodoInput";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Alert, FlatList, SafeAreaView, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";

type Todo = Doc<"todos">

const Index = () => {

  const { colors } = useTheme();
  const homeStyles = createHomeStyles(colors);

  const todos = useQuery(api.todos.getTodos);
  const toggleTodo = useMutation(api.todos.toggleTodo)
  const deleteTodo = useMutation(api.todos.deleteTodo)
  const updateTodo = useMutation(api.todos.updateTodo)

  const [editingId, setEdittingId] = useState<Id<"todos"> | null>(null);
  const [editingText, setEditingText] = useState("");

  const handleEditTodo = (todo: Todo) => {
    setEditingText(todo.text);
    setEdittingId(todo._id);
  }

  const handleSaveTodo = async () => {
    if (editingId) {
      try {
        await updateTodo({ id: editingId, text: editingText })
        cancelEdittingState();
      } catch (error) {
        console.log("Error in save todo", error);
      }
    }
  }

  const cancelEdittingState = () => {
    setEdittingId(null);
    setEditingText("");
  }

  const handleToggleTodo = async (id: Id<"todos">) => {
    try {
      await toggleTodo({ id })
    } catch (error) {
      console.log("Error toggling todo", error);
      Alert.alert("Error,failed to handle todo state")
    }
  }

  const handleDeleteTodo = async (id: Id<"todos">) => {
    Alert.alert("Delete todo", "Are you sure you want to delete this todo?",
      [{ text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => { deleteTodo({ id }) } }]
    )
  }

  const isLoading = todos === undefined
  console.log(todos);

  if (isLoading) {
    return (<LoadingSpinner />)
  }

  const renderTodoItem = ({ item }: { item: Todo }) => {

    const isEditing = editingId === item._id

    return (
      <View style={homeStyles.todoItemWrapper}>
        <LinearGradient
          colors={colors.gradients.surface}
          style={homeStyles.todoItem}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <TouchableOpacity style={homeStyles.checkbox} activeOpacity={0.7}
            onPress={() => handleToggleTodo(item._id)}>
            <LinearGradient colors={item.isCompleted ? colors.gradients.success : colors.gradients.muted}
              style={[homeStyles.checkboxInner, { borderColor: item.isCompleted ? "transparent" : colors.border }]}>

              {true && <Ionicons name="checkmark" size={18} color="#fff" />}

            </LinearGradient>
          </TouchableOpacity>

          {isEditing ? (
            // 编辑框
            <View style={homeStyles.editContainer}>
              <TextInput
                style={homeStyles.editInput}
                value={editingText}
                onChangeText={setEditingText}
                autoFocus
                multiline
                placeholder="Edit your todo..."
                placeholderTextColor={colors.textMuted} />

              <View style={homeStyles.editButtons}>
                {/* 编辑按钮 */}
                <TouchableOpacity activeOpacity={0.8} onPress={handleSaveTodo} >
                  <LinearGradient colors={colors.gradients.success} style={homeStyles.editButton}>
                    <Ionicons name="checkmark" size={16} color="#fff" />
                    <Text style={homeStyles.editButtonText}>Save</Text>
                  </LinearGradient>
                </TouchableOpacity>
                {/* 取消编辑 */}
                <TouchableOpacity activeOpacity={0.8} onPress={cancelEdittingState} >
                  <LinearGradient colors={colors.gradients.muted} style={homeStyles.editButton}>
                    <Ionicons name="close" size={16} color="#fff" />
                    <Text style={homeStyles.editButtonText}>Cancel</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>

          ) : (<View style={homeStyles.todoTextContainer}>
            <Text style={[homeStyles.todoText, item.isCompleted && {
              textDecorationLine: "line-through",
              color: colors.textMuted,
              opacity: 0.6
            }]}>
              {item.text}
            </Text>

            <View style={homeStyles.todoActions}>
              {/* 编辑按钮 */}
              <TouchableOpacity onPress={() => { handleEditTodo(item) }} activeOpacity={0.8}>
                <LinearGradient colors={colors.gradients.warning} style={homeStyles.actionButton} >
                  <Ionicons name="pencil" size={14} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
              {/* 删除按钮 */}
              <TouchableOpacity onPress={() => { handleDeleteTodo(item._id) }} activeOpacity={0.8}>
                <LinearGradient colors={colors.gradients.danger} style={homeStyles.actionButton} >
                  <Ionicons name="trash" size={14} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>)}

        </LinearGradient>

      </View>
    );
  }

  return (
    <LinearGradient colors={colors.gradients.background}
      style={homeStyles.container}>
      {/* 状态栏 */}
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView style={homeStyles.safeArea} >
        <Header />
        <TodoInput />

        <FlatList
          data={todos}
          renderItem={renderTodoItem}
          keyExtractor={(item) => item._id}
          style={homeStyles.todoList}
          contentContainerStyle={homeStyles.todoListContent}
          ListEmptyComponent={EmptyState} />

      </SafeAreaView>
    </LinearGradient>
  );
}

export default Index
