import React, { useState } from 'react';
import { Dimensions, View, StyleSheet, TextInput } from 'react-native';

import AppText from './AppText';
import colors from '../config/colors';


const { width } = Dimensions.get('window');

const NewListItem = ({ handleSubmit }) => {
    const [input, setInput] = useState();
    
    return (
        <View style={styles.container}>
            <TextInput
                onChangeText={text => setInput(text)} 
                onEndEditing={() => handleSubmit(input)}
                style={styles.text} />
        </View>
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

export default NewListItem;