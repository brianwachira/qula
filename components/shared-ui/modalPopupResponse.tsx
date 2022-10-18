import React from 'react';
import {Image, Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import theme from '../../styles/themes';
import Text from './text';

interface IModalPopup {
  errorMessage: string;
  toggleModal: () => void;
  handleModalClose: () => void;
  visible: boolean;
  successMessage: string;
}

const ModalPopupResponse = (props: IModalPopup) => {
  const {errorMessage, successMessage, toggleModal, handleModalClose, visible} =
    props;

  return (
    <Modal transparent visible={visible}>
      <View style={theme.globalStyle.modalBackGround}>
        <View style={theme.globalStyle.modalContainer}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={
                errorMessage.length > 0 ? toggleModal : handleModalClose
              }>
              <MaterialIcons
                name="close"
                size={30}
                color={theme.colors.black}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.modalBodyWrapper}>
            <View style={theme.globalStyle.itemsCenter}>
              <Image
                source={
                  errorMessage.length > 0
                    ? require('../../assets/error.png')
                    : require('../../assets/info.png')
                }
                style={{width: 60, height: 60, marginVertical: 10}}
              />
            </View>
            <Text style={{marginVertical: 20}} textAlign="center">
              {errorMessage.length > 0
                ? `${errorMessage}`
                : `${successMessage}`}
            </Text>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={
                errorMessage.length > 0 ? toggleModal : handleModalClose
              }>
              <View style={styles.modalButton}>
                <Text
                  textType="labelButtonOrange"
                  textAlign="center"
                  color="white">
                  Ok
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#EDEDED',
    borderTopLeftRadius: theme.borderRadius.button,
    borderTopRightRadius: theme.borderRadius.button,
  },
  modalBodyWrapper: {
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  modalButton: {
    paddingHorizontal: 40,
    paddingVertical: 20,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.button,
    ...theme.boxShadowAndroid,
  },
});
export default ModalPopupResponse;
