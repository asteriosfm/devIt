import React, { useContext, useState } from 'react';
import { ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { styled } from 'styled-components/native';
import { User, userDefault } from '../../common/types/User';
import { Formik } from 'formik';
import * as Yup from "yup";

import dbContext from '../../common/dbClientContext';
import userContext from '../../common/userContext';
import { GET_USER_QUERY, SET_USER_QUERY } from '../../common/db/queries';

import InputComponent from '../../components/uikit/Input';
import Logo from '../../components/icons/Logo.svg';
import Button from '../../components/uikit/Button';
import PhoneInput from '../../components/uikit/PhoneInput';
import CodeInput from '../../components/uikit/CodeInput';


const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Must have at least 2 chars")
    .max(100, "Too long name")
    .required("Name is required"),
  email: Yup.string()
    .email("Wrong email format")
    .required("Email is required"),
  phone: Yup.string()
    .required("Phone is required"),
  phoneCode: Yup.string()
    .required("Phone code is required"),
  code: Yup.string()
    .required("Code is required"),
  password: Yup.string()
    .required("Password is required"),
  passwordConf: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match'),
});


function Signup({ navigation }) {
  const { client } = useContext(dbContext);
  const { setUser } = useContext(userContext)

  const [loading, setLoading] = useState(false);

  const getUser = async (email: User['email']) => {
    const rows = await client.transaction({
      query: GET_USER_QUERY,
      data: [email],
    })
    if (rows.length > 0) {
      return rows?.item(0)
    }
  }

  const onSubmit = async (values, { setErrors }) => {
    const user = {
      ...values,
      phone: `${values.phoneCode}${values.phone}`
    }

    setLoading(true)
    const isExist = await getUser(user.email);
    if (isExist) {
      setErrors({ email: 'User already exists' });
      return;
    };
    try {
      await client.transaction({
        query: SET_USER_QUERY,
        data: [user.name, user.email, `${user.phoneCode} ${user.phone}`, user.password],
      });
      setUser(user)
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  return <Container>
    <ScrollView>
      <LogoView>
        <Logo />
      </LogoView>
      <Title>Sign Up To woorkroom</Title>
      <Formik
        initialValues={userDefault}
        onSubmit={onSubmit}
        validationSchema={SignupSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <Form>
            <PhoneInput
              disabled={false}
              placeholder='345 567-23-56'
              label='Your Phone'
              onChangeText={(code: string, phone: string) => {
                handleChange('phone')(phone)
                handleChange('phoneCode')(code)
              }}
              onBlur={handleBlur('phone')}
              value={values.phone.text}
              hasError={!!errors.phone || !!errors.phoneCode}
              errorText={errors.phone as string || errors.phoneCode as string}
              touched={!!touched.phone || !!touched.phoneCode}
              style={styles.input}
            />
            <CodeInput
              disabled={false}
              placeholder=''
              label='Your Code'
              onChangeText={handleChange('code')}
              onBlur={handleBlur('code')}
              value={values.code}
              hasError={!!errors.code}
              errorText={errors.code as string}
              touched={!!touched.code}
              style={styles.input}
            />
            <InputComponent
              disabled={false}
              placeholder='name'
              label='Your Name'
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              hasError={!!errors.name}
              errorText={errors.name as string}
              touched={!!touched.name}
              style={styles.input}
            />
            <InputComponent
              disabled={false}
              placeholder='email'
              label='Your Email'
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              hasError={!!errors.email}
              errorText={errors.email as string}
              touched={!!touched.email}
              style={styles.input}
              email
            />
            <InputComponent
              disabled={false}
              placeholder='password'
              label='Password'
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              hasError={!!errors.password}
              errorText={errors.password as string}
              touched={!!touched.password}
              password
              style={styles.input}
            />
            <InputComponent
              disabled={false}
              placeholder='password'
              label='Confirm Password'
              onChangeText={handleChange('passwordConf')}
              onBlur={handleBlur('passwordConf')}
              value={values.passwordConf}
              hasError={!!errors.passwordConf}
              errorText={errors.passwordConf as string}
              touched={!!touched.passwordConf}
              password
              style={styles.input}
            />

            <Button
              title='Submit'
              disabled={loading}
              onPress={() => handleSubmit(values)}
            />
          </Form>
        )}
      </Formik>
      <Bottom>
        <LeftText>Have Account? </LeftText>
        <TouchableOpacity
          disabled={loading}
          onPress={() => navigation.navigate('Login')}
        >
          <RightText>
            Log in
          </RightText>
        </TouchableOpacity>
      </Bottom>
    </ScrollView>
  </Container>
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 40,
  }
})

const Container = styled.View`
  flex: 1;
`

const LogoView = styled.View`
  width: 100%;
  display: flex;
  justifyContent: center;
  alignItems: center;
  marginBottom: 110px;
  marginTop: 50px;
`;

const Title = styled.Text`
  marginBottom: 50px;
  width: 100%;
  textAlign: center;
  color: #1F1D1D;
  fontSize: 24px;
  fontFamily: Poppins;
  fontStyle: normal;
  fontWeight: 500;
  textTransform: capitalize;
`;

const Form = styled.View`
  maxWidth: 365px;
  width: 100%;
  padding: 0 32px;
  display: flex;
  flexDirection: column;
  margin: 0 auto 35px auto;
`;

const Bottom = styled.View`
  width: 100%;
  display: flex;
  display: flex;
  justifyContent: center;
  alignItems: center;
  marginBottom: 206px;
  flexDirection: row;
`;

const LeftText = styled.Text`
  color: #9795A4;
  fontSize: 14px;
  fontFamily: Poppins;
  fontStyle: normal;
  fontWeight: 400;
`;

const RightText = styled.Text`
  color: #FFC612;
  fontSize: 14px;
  fontFamily: Poppins;
  fontStyle: normal;
  fontWeight: 400;
`;


export default Signup;
