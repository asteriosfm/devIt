import React, { FC } from 'react';
import { styled } from 'styled-components/native';


interface Props {
  title: string;
  onPress: (e: any) => void;
  disabled?: boolean;
}

const Button: FC<Props> = ({
  title,
  onPress,
  disabled=false,
}) => {

    return <StyledButton
      onPress={onPress}
      disabled={disabled}
    >
      <Title>{title}</Title>
    </StyledButton>
}

const StyledButton = styled.TouchableOpacity`
  padding: 18px 0px;
  display: flex;
  justifyContent: center;
  alignItems: center;
  border-radius: 20px;
  background: #FFC612;
  width: 100%;
`;

const Title = styled.Text`
  color: #1F1D1D;
  fontSize: 18px;
  fontStyle: normal;
  fontWeight: 500;
  textTransform: capitalize;
  fontFamily: Poppins;
`;

export default Button;
