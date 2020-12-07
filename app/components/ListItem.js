import React from 'react';
import { Dimensions, View, StyleSheet, TouchableOpacity } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import AppText from './AppText';
import colors from '../config/colors';
import ListItemDelete from './ListItemDelete';


const { width } = Dimensions.get('window');

const ListItem = ({ renderRightActions, title, onPress }) => {

    return (
        <TouchableOpacity  onPress={onPress}>
            <Swipeable renderRightActions={renderRightActions}>
                <View style={styles.container}>
                    <AppText style={styles.text}>{title}</AppText>
                </View>
            </Swipeable>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
  container: {
      alignItems: 'center',
      backgroundColor: colors.secondary,
      height: 100,
      justifyContent: 'center',
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