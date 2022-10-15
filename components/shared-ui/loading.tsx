import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import theme from '../../styles/themes';

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
  },
});

const Loading = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator color={theme.colors.black} animating size="small" />
    </View>
  );
};

export default Loading;
