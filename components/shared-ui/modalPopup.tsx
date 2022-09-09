import React from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import theme from '../../styles/themes';

type IModalPopup = {
  visible: boolean;
  children: React.ReactNode;
};
const ModalPopup = (props: IModalPopup) => {
  return (
    <Modal transparent visible={props.visible}>
      <View style={styles.modalBackGround}>
        <View style={[styles.modalContainer]}>{props.children}</View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '70%',
    backgroundColor: 'white',
    borderRadius: theme.borderRadius.button,
    elevation: 20,
  },
});

export default ModalPopup;
