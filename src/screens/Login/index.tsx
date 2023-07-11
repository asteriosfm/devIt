import React, { useContext, useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { styled } from 'styled-components/native';
import { Formik } from 'formik';
import * as Yup from "yup";

import { User, userDefault } from '../../common/types/User';
import dbContext from '../../common/dbClientContext';
import userContext from '../../common/userContext';
import { GET_USER_QUERY } from '../../common/db/queries';

import InputComponent from '../../components/uikit/Input';
import Logo from '../../components/icons/Logo.svg';
import Button from '../../components/uikit/Button';


const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Wrong email format")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required"),
});


function Signup({ navigation }) {
  const { client } = useContext(dbContext);
  const { setUser } = useContext(userContext)

  const [loading, setLoading] = useState(false)

  const getUser = async (email: User['email']) => {
    const rows = await client.transaction({
      query: GET_USER_QUERY,
      data: [email],
    })
    if (rows?.length > 0) {
      return rows.item(0)
    }
  }

  const onSubmit = async (values, {setErrors}) => {
    setLoading(true)
    const user = await getUser(values.email);
    const isPasswordsMatch = user?.password === values.password;

    if (!user || !isPasswordsMatch) {
      setErrors({
        email: "The email/password combination used was not found on the system",
        password: 'The email/password combination used was not found on the system'
      })
      return;
    };

    setLoading(false)
    setUser(user)
    navigation.navigate('Profile');
  }


  return <Container>
    <ScrollView>
      <LogoView>
        <Logo />
      </LogoView>
      <Title>Log in to woorkroom</Title>
      <Formik
        initialValues={userDefault}
        onSubmit={onSubmit}
        validationSchema={SignupSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <Form>
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
              password={true}
            />
            <Button
              title='Log in'
              onPress={() => handleSubmit(values)}
              disabled={loading}
            />
          </Form>
        )}
      </Formik>
      <Bottom>
        <LeftText>New User? </LeftText>
        <TouchableOpacity
          disabled={loading}
          onPress={() => navigation.navigate('Signup')}
        >
          <RightText>
            Create Account
          </RightText>
        </TouchableOpacity>
      </Bottom>
    </ScrollView>
  </Container>
}

const Container = styled.View`
  flex: 1;
`;

const LogoView = styled.View`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 110px;
  margin-top: 50px;
`;

const Title = styled.Text`
  margin-bottom: 50px;
  width: 100%;
  text-align: center;
  color: #1F1D1D;
  fontSize: 24px;
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
  justify-content: center;
  align-items: center;
  margin-bottom: 206px;
  flex-direction: row;
`;

const LeftText = styled.Text`
  color: #9795A4;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
`;

const RightText = styled.Text`
  color: #FFC612;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
`;

export default Signup;
