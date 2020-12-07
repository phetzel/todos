import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

// import colors from '../config/colors';

const Screen = ({ children }) => {
    return (
        <SafeAreaView style={styles.screen}>
            {children}
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    screen: {
    //   backgroundColor: colors.background,
        alignItems: 'center',
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        width: '100%'
  },
});

export default Screen;