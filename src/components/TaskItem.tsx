import React, { useContext, useState } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import trashIcon from '../assets/icons/trash/trash.png'
import Icon from 'react-native-vector-icons/Feather';
import { Task } from "./TasksList";
import TasksContext from "../pages/Home";
import editIcon from '../assets/icons/edit/edit.png'
import xIcon from '../assets/icons/edit/x.png'

interface TaskItem {
  index: number;
  item: Task;
}

export default function TaskItem({ index, item }: TaskItem) {
  const { tasks, setTasks } = useContext(TasksContext);
  const [editTask, setEditTask] = useState<boolean>(false);
  const [newTaskTitle, setNewTaskTitle] = useState<string>(item.title)

  function handleToggleTaskDone(id: number) {
    setTasks(tasks.map((task) => task.id === id ? { ...task, done: !task.done } : task))
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover item', 'Tem certeza que deseja remover esse item?', [
      { text: 'Não' },
      { text: 'Sim', onPress: () => setTasks(tasks.filter((task) => task.id !== id)) }
    ])
  }

  function handleEditTask(id: number, newTaskTitle: string): void {
    const editedTask = tasks.map((task) => task.id === id ? { ...task, title: newTaskTitle } : task)
    setTasks(editedTask)
    setEditTask(false)
  }

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => { if (!editTask) handleToggleTaskDone(item.id) }}
        >
          <View
            testID={`marker-${index}`}
            style={item.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {item.done && (
              <Icon
                name="check"
                size={15}
                color="#FFFFFF"

              />
            )}
          </View>
          {
            editTask ?
              <TextInput
                value={newTaskTitle}
                style={styles.taskText}
                multiline={true}
                onChangeText={setNewTaskTitle}
                onSubmitEditing={() => {
                  handleEditTask(item.id, newTaskTitle)
                }} /> :
              <Text
                style={item.done ? styles.taskTextDone : styles.taskText}
              >
                {item.title}
              </Text>
          }
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
        <TouchableOpacity
          testID={`edit-${index}`}
          style={{ paddingHorizontal: 20, alignSelf: 'flex-end', marginBottom: 5 }}
          onPress={() => setEditTask(!editTask)}
        >
          <Image source={editTask ? xIcon : editIcon} style={{ marginRight: -30 }} />
        </TouchableOpacity>
        <TouchableOpacity
          testID={`trash-${index}`}
          style={{ paddingHorizontal: 24 }}
          disabled={editTask}
          onPress={() => handleRemoveTask(item.id)}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </>

  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium',
    width: '80%',
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium',
    width: '80%'
  },
})