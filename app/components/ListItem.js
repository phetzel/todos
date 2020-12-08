import React from 'react';
import { Dimensions, View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import Swipeable from 'react-native-gesture-handler/Swipeable';

import AppText from './AppText';
import colors from '../config/colors';
import ListItemDelete from './ListItemDelete';


const { width } = Dimensions.get('window');

const ListItem = ({ renderRightActions, title, onPress, task }  ) => {
    let icon;
    if (task) {
        if (task.complete) {
            icon = <MaterialCommunityIcons 
                    name="checkbox-marked-outline" 
                    size={30} 
                    color={colors.green} />
        } else {
            icon = <MaterialCommunityIcons 
                    name="checkbox-blank-outline" 
                    size={30} 
                    color={colors.red} />
        }
    }

    return (
        <TouchableOpacity  onPress={onPress}>
            <Swipeable renderRightActions={renderRightActions}>
                <View style={styles.container}>
                    <AppText style={styles.text}>{title}</AppText>
                    {icon}
                </View>
            </Swipeable>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
  container: {
      alignItems: 'center',
      backgroundColor: colors.secondary,
      flexDirection: 'row',
      height: 100,
      justifyContent: 'space-around',
      marginBottom: 10,
      marginTop: 10,
      width: width,
  },
  text: {
    color: colors.white,
    fontSize: 25,
    fontWeight: 'bold'
  }
});

export default ListItem;