import React, { ForwardedRef, forwardRef, useState } from "react";
import { styled, css } from "styled-components/native";
import { ExecutionContext } from "styled-components";
import { NativeSyntheticEvent, TextInputKeyPressEventData } from "react-native";

interface InputWrapperProps extends ExecutionContext {
  error?: boolean;
  focused?: boolean;
}

interface Props {
  id: any,
  error: boolean,
  value: string,
  onBlur: (e: any) => void,
  onKeyPress,
}

const InputItem = forwardRef((props: Props, ref: ForwardedRef<JSX.Element>) => {
  const { id, error, value, onBlur, onKeyPress } = props;
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };


  return <Wrapper
      error={error}
      focused={isFocused}
    >
      <Input
        id={id}
        value={value}
        onKeyPress={(e: NativeSyntheticEvent<TextInputKeyPressEventData>) => onKeyPress(e)}
        onFocus={handleFocus}
        onBlur={(e) => {
          handleBlur();
          onBlur(e)
        }}
        keyboardType='numeric'
        ref={ref}
        maxLength={1}
      />
    </Wrapper>
})

export default InputItem;


const Wrapper = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  minHeight: 48px;
  height: 48px;
  minWidth: 48px;
  width: 48px;
  borderColor: #D7D7D7;
  borderWidth: 1px;
  display: inline-flex;
  borderRadius: 15px;
  box-sizing: border-box;
  marginRight: 25px;
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
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 15px 12px 18px;
`
