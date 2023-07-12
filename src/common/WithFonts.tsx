import React from 'react';
import { useFonts } from 'expo-font';


interface Props {
  children: JSX.Element
}

const WithFonts: React.FC<Props> = ({children}) => {
  const [fontsLoaded] = useFonts({
    'Poppins': require('../../assets/fonts/Poppins.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return children;
};

export default WithFonts;
