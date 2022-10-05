import React from 'react';
import {Dimensions, SafeAreaView, StyleSheet, View} from 'react-native';
import RefreshIcon from '../../assets/icons/refreshIcon';
import theme from '../../styles/themes';
import Button from './button';
import Text from './text';

const EmptyState = ({label, onPress}: {label: string; onPress: any}) => {
  return (
    <SafeAreaView style={styles.containerEmpty}>
      <View style={styles.contentContainerEmpty}>
        <RefreshIcon
          style={styles.marginBottomStyle}
          width={150}
          height={150}
          fill={theme.colors.icon}
        />

        <Text style={styles.marginBottomStyle2} textType="empty">
          Nothing here yet
        </Text>
        <Text style={[styles.textOpacity]} textAlign="center">
          Hit the orange button down below to {label}
        </Text>
      </View>
      <View>
        <Button
          title={label}
          buttonType="orange"
          textType="labelButtonOrange"
          accessibilityLabel="Start Ordering"
          onPress={onPress}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerEmpty: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
    flex: 1,
    marginHorizontal: 40,
  },
  contentContainerEmpty: {
    flexGrow: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textOpacity: {
    opacity: 0.57,
    fontWeight: '400',
    width: Dimensions.get('screen').width - 130,
  },
  marginBottomStyle: {
    marginBottom: 30,
  },
  marginBottomStyle2: {
    marginBottom: 20,
  },
});

export default EmptyState;
