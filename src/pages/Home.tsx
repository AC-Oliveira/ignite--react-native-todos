import React, { Dispatch, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

interface Context {
  tasks: Task[];
  setTasks: Dispatch<React.SetStateAction<Task[]>>;
}
// @ts-ignore
const TasksContext = React.createContext<Context>({});

export default TasksContext;

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskExists = tasks.some((task) => task.title == newTaskTitle)
    if (taskExists) {
      Alert.alert("Task ja cadastrada", 'Você não ppode cadastrar uma task com o mesmo nome')
    }
    else {
      setTasks([...tasks, { id: Date.now() + Math.random(), title: newTaskTitle, done: false }])
    }
  }

  return (
    <TasksContext.Provider value={{ tasks, setTasks }}>
      <View style={styles.container}>
        <Header tasksCounter={tasks.length} />

        <TodoInput addTask={handleAddTask} />

        <TasksList
          tasks={tasks}
        />
      </View>
    </TasksContext.Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})