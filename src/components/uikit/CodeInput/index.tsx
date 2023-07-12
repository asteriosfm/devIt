import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { styled } from "styled-components/native";
import { NativeSyntheticEvent, TextInputKeyPressEventData } from "react-native";
import { StyleProp, View, ViewStyle } from "react-native";

import InputItem from "./InputItem";


export interface Props {
  name?: string;
  value?: string;
  onChangeText: (e: string | ChangeEvent) => void;
  onBlur: (e: any) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  errorText?: string;
  hasError?: boolean;
  touched?: boolean;
  password?: boolean;
  style?: StyleProp<ViewStyle>

}

const LENGTH = 4;
const DEFAULT_CODE = new Array(LENGTH).fill('');

const CodeInput = ({
  label,
  disabled = false,
  hasError = false,
  errorText = "",
  onChangeText,
  onBlur,
  touched = false,
  style = {}
}: Props) => {
  const [code, setCode] = useState<string[]>(DEFAULT_CODE);

  const onBackSpace = useCallback((refs: React.MutableRefObject<any>[], index: number) => {
    setCode(code => code.map((char: string, charIndex: number) => {
      if (charIndex === index) {
        return ''
      }
      return char
    }))
    const prevInput = refs[index - 1];
    if (prevInput) prevInput.current.focus();
  }, [code])

  const onNumber = useCallback((key: number, refs: React.MutableRefObject<any>[], index: number) => {
    setCode(code => code.map((char: string, charIndex: number) => {
      if (charIndex === index) {
        return String(key)
      }
      return char
    }))
    const nextInput = refs[index + 1]
    if (nextInput) nextInput.current.focus();
  }, [code])

  const onCodeChange = useCallback((
    { 
      nativeEvent: {
        key: keyValue,
      },
    },
    refs: React.MutableRefObject<any>[],
    index
  ) => {
    if (!refs.length) return;
    if (keyValue === 'Backspace') {
      onBackSpace(refs, index)
    } else {
      onNumber(keyValue, refs, index)
    }
  }, [code])

  const error = errorText && hasError && touched;

  const renderInputs = () => {
    const refs = [];
    return code.map((_, index: number) => {
      const inputRef = useRef(null);
      refs.push(inputRef);

      return <React.Fragment
        key={`id-${index}`}
      >
        <InputItem
          id={`id-${index}`}
          error={error}
          value={code[index]}
          onKeyPress={(e: NativeSyntheticEvent<TextInputKeyPressEventData>) => onCodeChange(e, refs, index)}
          onBlur={onBlur}
          ref={inputRef}
        />
      </React.Fragment>
    })
  }

  useEffect(() => {
    onChangeText(code.join(''))
  }, [code])

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
        <Wrappers>
          {renderInputs()}
        </Wrappers>
        {error && (
          <ErrorContainer>
            <ErrorText>{errorText}</ErrorText>
          </ErrorContainer>
        )}
      </Container>
    </View>
  );
};

export default CodeInput;


const Container = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
`
const LabelContainer = styled.View`
  margin-bottom: 15px;
`

const LabelText = styled.Text`
  color: #9795A4;
  fontSize: 14px;
  fontStyle: normal;
  fontWeight: 500;
  textTransform: capitalize;
  fontFamily: Poppins;
`
const Wrappers = styled.View`
  display: flex;
  flex-direction: row;
`

const ErrorContainer = styled.View`
  margin-top: 10px;
`

const ErrorText = styled.Text`
  color: #FF4848;
  fontSize: 14px;
  fontStyle: normal;
  fontWeight: 500;
  textTransform: capitalize;
  fontFamily: Poppins;
`;
