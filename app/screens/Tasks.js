import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Dimensions, View, StyleSheet } from 'react-native';

import { fetchCategory } from '../api/category_api';
import { createTask, deleteTask, updateTask } from '../api/task_api';
import ListItemDelete from '../components/ListItemDelete';
import ListItem from '../components/ListItem';
import NewListItem from '../components/NewListItem';
import Screen from '../components/Screen';

const Tasks = ({ route }) => { 
  const [tasks, setTasks] = useState();
  const scrollRef = useRef(); 

  const { height } = Dimensions.get('window');

  const handlePress = task => {
    const { id } = route.params;
    const complete = task.complete ? false : true;

    const data = new FormData();
    data.append("task[title]", task.title);
    data.append("task[category_id]", task.category_id);
    data.append("task[complete]", complete);

    updateTask(data, task.id)
      .then(res => {
        fetchCategory(id)
          .then(res => {
            const newTasks = res.data.tasks;
            setTasks(newTasks);
          });
      });
  }

  const handleSubmit = input => {
    const { id } = route.params;

    const data = new FormData();
    data.append("task[title]", input);
    data.append("task[category_id]", id);
    createTask(data)
      .then(res => {
        fetchCategory(id)
          .then(res => {
            const newTasks = res.data.tasks;
            setTasks(newTasks);
            scrollRef.current.scrollTo({y: 148, animated: true})
          });
      });
  }

  const handleDelete = taskId => {
    deleteTask(taskId)
      .then(res => setTasks(res.data));
  }

  useEffect(() => {
    const { id } = route.params;
    fetchCategory(id)
      .then(res => {
        const newTasks = res.data.tasks;
        setTasks(newTasks);
      });
  }, []);

  return (
    <Screen style={styles.container}>
        <View stle={styles.list}>
          <FlatList 
            contentContainerStyle={{ flexGrow: 1, minHeight: height }}
            contentOffset={{ y: 148 }}
            data={tasks}
            keyExtractor={task => task.id.toString()}
            ListHeaderComponent={<NewListItem handleSubmit={handleSubmit} />}
            renderItem={({ item }) => (
              <ListItem
                onPress={() => handlePress(item)}
                task={item}
                title={item.title}
                renderRightActions={() => 
                  <ListItemDelete onPress={() => handleDelete(item.id)} />
                }/> 
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  list: {
    width: '100%'
  },
  separator: {
    backgroundColor: '#000',
    height: 1,
    width: '100%'
  }
});

export default Tasks;