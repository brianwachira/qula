import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import theme from '../styles/themes';
import FormikTextInput from './shared-ui/formikTextInput';
import Text from './shared-ui/text';
import Feather from 'react-native-vector-icons/Feather';
import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import {useField} from 'formik';

const EditProfileForm = () => {
  const [fieldImage, metaImage, helpersImage] = useField('image');

  // Check if the field is touched and the error message is present
  const showErrorImage: boolean = (metaImage.touched &&
    metaImage.error) as boolean;

  const handleLaunchImage = async () => {
    const result: ImagePickerResponse = await launchImageLibrary({
      mediaType: 'photo',
    });

    if (!result.didCancel) {
      helpersImage.setValue(result?.assets[0]);
    }
  };

  return (
    <View style={styles.formContainer}>
      <View style={styles.inputContainer}>
        <Text
          textType="labelInput"
          style={[styles.marginBottom, {opacity: theme.opacity.one}]}>
          Choose Profile Image
        </Text>
        {fieldImage?.value ? (
          <>
            <Text
              textType="labelSmall"
              style={[styles.marginBottom, {opacity: theme.opacity.one}]}>
              Long Press To Remove
            </Text>
            <TouchableOpacity
              onLongPress={() => helpersImage.setValue(undefined)}>
              <Image
                source={{
                  uri: fieldImage.value.uri || fieldImage.value,
                }}
                style={styles.imageContainer}
              />
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={[styles.imagePlaceholder]}
            onPress={handleLaunchImage}
            onBlur={() => helpersImage.setTouched(true)}>
            <Feather name="plus" size={25} color={theme.colors.grey} />
          </TouchableOpacity>
        )}
        {/* Show the error message if the value of showError variable is true */}
        {showErrorImage && (
          <Text style={styles.errorText} textType="labelSmall">
            {metaImage.error}
          </Text>
        )}
      </View>
      <View style={styles.inputSeparator}>
        <FormikTextInput
          name="names"
          testID="name"
          style={styles.input}
          placeholderTextColor={theme.colors.primary}
          selectionColor={theme.colors.black}
        />
      </View>
      <View style={styles.inputSeparator}>
        <FormikTextInput
          name="username"
          placeholder="Enter Username"
          style={styles.input}
          placeholderTextColor={theme.colors.grey}
        />
      </View>
      <View style={styles.inputSeparator}>
        <FormikTextInput
          name="phone"
          testID="phone"
          style={styles.input}
          placeholderTextColor={theme.colors.primary}
          selectionColor={theme.colors.black}
        />
      </View>
      <View style={styles.inputSeparator}>
        <FormikTextInput
          name="email"
          testID="email"
          style={styles.input}
          placeholderTextColor={theme.colors.primary}
          selectionColor={theme.colors.black}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: theme.colors.white,
    color: '#202731',
    borderColor: '#818298',
    borderWidth: 1,
    height: 50,
    borderRadius: 30,
    padding: 10,
    paddingLeft: 10,
  },
  inputSeparator: {
    marginBottom: 20,
  },
  editProfileForm: {
    flex: 1,
    justifyContent: 'center',
  },
  inputLabel: {marginLeft: 20, marginBottom: 10},
  buttonContainer: {alignItems: 'center'},
  imagePlaceholder: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: theme.colors.primary,
    borderWidth: 2,
    borderStyle: 'dashed',
    backgroundColor: theme.colors.icon,
    borderRadius: 50,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 50,
  },
  marginBottom: {
    marginBottom: 10,
  },
  errorText: {
    marginTop: 5,
    color: theme.colors.danger,
  },
});

export default EditProfileForm;
