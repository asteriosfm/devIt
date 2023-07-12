import React, { ChangeEvent, useState } from "react";
import { styled, css } from "styled-components/native";
import { ExecutionContext } from "styled-components";
import { StyleProp, View, ViewStyle } from "react-native";

import EyeOpen from '../../icons/EyeOpen.svg'
import EyeClosed from '../../icons/EyeClosed.svg'


export interface Props {
  name?: string;
  value?: string;
  onChangeText: (e:string | ChangeEvent) => void;
  onBlur: (e: any) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  errorText?: string;
  hasError?: boolean;
  touched?: boolean;
  password?: boolean;
  email?: boolean;
  style?: StyleProp<ViewStyle>
}

interface InputWrapperProps extends ExecutionContext {
  error?: boolean;
  focused?: boolean;
}

const InputComponent = ({
  name,
  label,
  placeholder = "",
  disabled = false,
  hasError = false,
  errorText = "",
  value,
  onChangeText,
  onBlur,
  touched = false,
  password = undefined,
  email = undefined,
  style = {},
}: Props) => {
  const [isPassword, setPassword] = useState(password);

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleUnFocus = () => {
    setIsFocused(false);
  };

  const renderEye = (isPassword: boolean | undefined) => {
    if (isPassword === undefined) return null;
    return <EyeContainer onPress={() => setPassword(value => !value)}>
        {isPassword ? <EyeClosed /> : <EyeOpen />}
    </EyeContainer>;
  }

  return (
    <View
      style={style}
    >
      <Container>
        {label && (
          <LabelContainer>
            <LabelText>{label}</LabelText>
          </LabelContainer>
        )}
        <InputWrapper
          error={errorText && hasError && touched}
          focused={isFocused}
        >
          <Input
            id={name}
            value={value}
            onChangeText={onChangeText}
            onFocus={handleFocus}
            onBlur={(e) => {
              handleUnFocus();
              onBlur(e)
            }}
            placeholder={placeholder}
            data-name={name}
            secureTextEntry={isPassword}
            {...email ? {inputMode: 'email'} : {}}
            // email
          />
          {renderEye(isPassword)}
        </InputWrapper>

        {errorText && hasError && touched && (
          <ErrorContainer>
            <ErrorText>{errorText}</ErrorText>
          </ErrorContainer>
        )}
      </Container>
    </View>
  );
};

const Container = styled.View`
  display: flex;
  flexDirection: column;
  width: 100%;
`
const LabelContainer = styled.View`
  marginBottom: 3px;
`

const LabelText = styled.Text`
  color: #9795A4;
  fontSize: 14px;
  fontFamily: Poppins;
  fontStyle: normal;
  fontWeight: 500;
  textTransform: capitalize;
`

const InputWrapper = styled.View`
  padding: 12px 0;
  width: 100%;
  borderBottomColor: #D7D7D7;
  borderBottomWidth: 1px;
  boxSizing: border-box;
  position: relative;
  ${(props: InputWrapperProps) => {
    if (props.error) {
      return css`borderBottomColor: #FF4848;`
    }
    if (props.focused) {
      return css`borderBottomColor: #FFC612;`
    }
  }}
`

const Input = styled.TextInput`
  width: 100%;
  color: #1F1D1D;
  fontSize: 16px;
  fontFamily: Poppins;
  fontStyle: normal;
  fontWeight: 500;
`

const ErrorContainer = styled.View`
  margin-top: 10px;
`

const ErrorText = styled.Text`
  color: #FF4848;
  fontSize: 14px;
  fontFamily: Poppins;
  fontStyle: normal;
  fontWeight: 500;
  textTransform: capitalize;
`;

const EyeContainer = styled.TouchableOpacity`
  position: absolute;
  right: -5px;
  padding: 5px;
`;

export default InputComponent;
