import React, { Dispatch, SetStateAction, useState } from "react";
import { styled, css } from "styled-components/native";
import { View, StyleSheet } from 'react-native';
import { ExecutionContext } from "styled-components";
import SelectDropdown from 'react-native-select-dropdown'

import Arrow from '../../icons/Arrow.svg';

interface InputWrapperProps extends ExecutionContext {
  error?: boolean;
  focused?: boolean;
}

interface Props {
  error: boolean,
  code: string,
  setCode: Dispatch<SetStateAction<string>>
}

const CODES = ["+1", "+2", "+3", "+4", "+5", "+6", "+7", "+8", "+9"]

const Dropdown: React.FC<Props> = ({
  error,
  code,
  setCode
}) => {

  const [isFocused, setIsFocused] = useState(false);

  return <Wrapper
    error={error}
    focused={isFocused}
  >
    <SelectDropdown
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      data={CODES}
      rowTextStyle={styles.rowTextStyle}
      dropdownStyle={styles.dropdownStyle}
      buttonStyle={styles.buttonStyle}
      rowStyle={styles.rowStyle}
      buttonTextStyle={!!code ? styles.buttonTextStyle : styles.buttonTextStyleDefault}
      onSelect={(selectedItem: string) => {
        setCode(selectedItem)
      }}
      defaultValue={CODES[0]}
      renderDropdownIcon={() => {
        return <View
          style={{ transform: isFocused ? [{ rotate: '180deg' }] : [] }}
        >
          <Arrow />
        </View>
      }}
    />
  </Wrapper>
}


const styles = StyleSheet.create({
  dropdownStyle: {
    borderRadius: 16,
    marginLeft: 8,
    marginTop: 13,
    maxHeight: 200,
  },
  buttonStyle: {
    flex: 1,
    backgroundColor: 'transparent',
    maxWidth: 70,
    marginLeft: 15,
  },
  buttonTextStyleDefault: {
    color: '#9795A4',
    fontSize: 16,
    fontWeight: "500",
  },
  buttonTextStyle: {
    color: '#1F1D1D',
    fontSize: 16,
    fontWeight: "500",
  },
  rowStyle: {
    width: 70,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    borderBottomColor: '#D7D7D7',
    borderBottomWidth: 1
  },
  rowTextStyle: {
    color: '#1F1D1D',
    fontSize: 16,
    fontWeight: "500",
  }
});

const Wrapper = styled.Pressable`
  padding: 12px 15px;
  width: 100%;
  maxWidth: 70px;
  height: 48px;
  borderColor: #D7D7D7;
  borderWidth: 1px;
  borderRadius: 15px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  ${(props: InputWrapperProps) => {
    if (props.error) {
      return css`borderColor: #FF4848;`
    }
    if (props.focused) {
      return css`borderColor: #FFC612;`
    }
  }}
`;


export default Dropdown;
