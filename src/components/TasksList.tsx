import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { ItemWrapper } from './ItemWrapper';
import TaskItem from './TaskItem';

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

export function TasksList({ tasks }: { tasks: Task[] }) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <ItemWrapper index={index}>
            <TaskItem index={index} item={item} />
          </ItemWrapper>
        );
      }}
      style={{
        marginTop: 32
      }}
    />
  )
}
