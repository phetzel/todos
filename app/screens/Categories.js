import React, { useState, useEffect } from 'react';
import { Dimensions, FlatList, View, StyleSheet } from 'react-native';

import AppText from '../components/AppText';
import { createCategory, deleteCategory, fetchCategories } from '../api/category_api';
import ListItem from '../components/ListItem';
import ListItemDelete from '../components/ListItemDelete';
import NewListItem from '../components/NewListItem';
import Screen from '../components/Screen';


const Categories = ({ navigation }) => {
  const [categories, setCategories] = useState();

  const { height } = Dimensions.get('window');

  const handleSubmit = input => {
    const data = new FormData();
    data.append("category[title]", input);
    createCategory(data)
      .then(res => {
        fetchCategories()
          .then(res => {
          setCategories(res.data);
        });
      });
  }

  const handleDelete = id => {
    deleteCategory(id)
      .then(res => setCategories(res.data));
  }

  const handlePress = item => {
    console.log(item.id);
    navigation.navigate("Tasks", {
      id: item.id
    });
  }

  useEffect(() => {
    fetchCategories()
      .then(res => {
        setCategories(res.data);
      });
  }, [])

  return (
      <Screen style={styles.container}>
        { categories &&
          <View stle={styles.list}>
            <FlatList 
              contentContainerStyle={{ flexGrow: 1, minHeight: height }}
              contentOffset={{ y: 148 }}
              data={categories}
              keyExtractor={task => task.id.toString()}
              ListHeaderComponent={<NewListItem handleSubmit={handleSubmit} />}
              renderItem={({ item }) => (
                <ListItem
                  complete={item}
                  onPress={() => handlePress(item)}
                  title={item.title} 
                  renderRightActions={() => 
                    <ListItemDelete onPress={() => handleDelete(item.id)} />
                  }/> 
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          </View>
        }
      </Screen>
  );
};

const styles = StyleSheet.create({
  container: {},
  separator: {
    backgroundColor: '#000',
    height: 1,
    width: '100%'
  }
});

export default Categories;