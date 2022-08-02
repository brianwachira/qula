import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

const Loading = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator color="#000" animating size="small" />
    </View>
  );
};

export default Loading;
