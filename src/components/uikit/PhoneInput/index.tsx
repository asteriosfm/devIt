import React, { ChangeEvent, useState } from "react";
import { styled, css } from "styled-components/native";
import { View, Text, Pressable, Modal, StyleSheet } from 'react-native';
import { ExecutionContext } from "styled-components";
import SelectDropdown from 'react-native-select-dropdown'

import Arrow from '../../../assets/Arrow.svg';
import Dropdown from "./Dropdown";

export interface Props {
  name?: string;
  value?: string;
  onChangeText: (code: string, phone: string) => void;
  onBlur: (e: any) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  errorText?: string;
  hasError?: boolean;
  touched?: boolean;
  password?: boolean;
}

interface InputWrapperProps extends ExecutionContext {
  error?: boolean;
  focused?: boolean;
}


const PhoneInput = ({
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
}: Props) => {
  const [code, setCode] = useState<string>('');
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleUnFocus = () => {
    setIsFocused(false);
  };


  return (
    <Container>
      {label && (
        <LabelContainer>
          <LabelText>{label}</LabelText>
        </LabelContainer>
      )}
      <Wrappers>
        <Dropdown
          error={errorText && hasError && touched}
          code={code}
          setCode={setCode}
        />
        <RightWrapper
          error={errorText && hasError && touched}
          focused={isFocused}
        >
          <Input
            id={name}
            value={value}
            onChangeText={(phone: string) => onChangeText(code, phone)}
            onFocus={handleFocus}
            onBlur={(e) => {
              handleUnFocus();
              onBlur(e)
            }}
            placeholder={placeholder}
            data-name={name}
            keyboardType='numeric'
          />
        </RightWrapper>
      </Wrappers>
      {errorText && hasError && touched && (
        <ErrorContainer>
          <ErrorText>{errorText}</ErrorText>
        </ErrorContainer>
      )}
    </Container>
  );
};


const Container = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 40px
`
const LabelContainer = styled.View`
  margin-bottom: 15px;
`

const LabelText = styled.Text`
  color: #9795A4;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  text-transform: capitalize;
`
const Wrappers = styled.View`
  display: inline-flex;
  flex-direction: row;
`

const RightWrapper = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 12px 15px;
  minHeight: 48px;
  borderColor: #D7D7D7;
  borderWidth: 1px;
  display: inline-flex;
  borderRadius: 15px;
  box-sizing: border-box;
  marginLeft: 25px;
  ${(props: InputWrapperProps) => {
    if (props.error) {
      return css`borderColor: #FF4848;`
    }
    if (props.focused) {
      return css`borderColor: #FFC612;`
    }
  }}
`;

const Input = styled.TextInput`
  width: 100%;
`

const ErrorContainer = styled.View`
  margin-top: 10px;
`

const ErrorText = styled.Text`
  color: #FF4848;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  text-transform: capitalize;
`;


export default PhoneInput;
