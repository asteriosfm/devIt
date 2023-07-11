import React, { useRef } from 'react';
import { TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';


const UploadImage = ({ children, onChange }) => {
  const cameraRef = useRef(null);

  const openImageLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({ base64: true });
      if (!result?.canceled) {
        const chosenImage = result?.assets[0].base64;
        onChange(chosenImage);
      }
    }
  };

  return (<>
    <Camera ref={cameraRef} />
    <TouchableOpacity
      onPress={openImageLibrary}
    >
      {children}
    </TouchableOpacity>
  </>);
};

export default UploadImage;