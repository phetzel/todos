import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import AppText from '../components/AppText';
import { fetchCategory } from '../api/category_api';
import ListItemDelete from '../components/ListItemDelete';
import ListItem from '../components/ListItem';
import Screen from '../components/Screen';

const Tasks = ({ route }) => { 
  const [tasks, setTasks] = useState();
  const [newTask, setNewTask] = useState(false);

  const onSwipeDown = () => {
    setNewTask(true);
    alert('swipped');
  }

  const handleDelete = task => {
    const newTasks = tasks.filter(t => t.id !== task.id);
    setTasks(newTasks);
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
      {/* <GestureRecognizer
        onSwipeDown={onSwipeDown}
      > */}
        <View stle={styles.list}>
          <FlatList 
            contentContainerStyle={{ flexGrow: 1 }}
            data={tasks}
            keyExtractor={task => task.id.toString()}
            renderItem={({ item }) => (
              <ListItem 
                title={item.title} 
                renderRightActions={() => 
                  <ListItemDelete onPress={() => handleDelete(item)} />
                }/> 
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>
      {/* </GestureRecognizer> */}
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