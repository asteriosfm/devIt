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
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background: #FFC612;
  width: 100%;
`;

const Title = styled.Text`
  color: #1F1D1D;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  text-transform: capitalize;
`;

export default Button;
