import React, { useContext, useState } from 'react';
import styled from 'styled-components/native';
import { ScrollView, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from "yup";

import userContext from '../../common/userContext';
import dbContext from '../../common/dbClientContext';
import { UPDATE_USER_QUERY } from '../../common/db/queries';

import InputComponent from '../../components/uikit/Input';
import Button from '../../components/uikit/Button';
import UploadImage from '../../components/uikit/UploadImage';
import EditAvatar from '../../components/icons/EditAvatar.svg'


const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Must have at least 2 chars")
    .max(100, "too long")
    .required("Name is required"),
  email: Yup.string()
    .email("Wrong email format")
    .required("Email is required"),
  phone: Yup.string()
    .required("Phone is required"),
});

function Profile() {
  const { user, setUser } = useContext(userContext);
  const { client } = useContext(dbContext);

  const [avatar, setAvatar] = useState(user?.avatar || null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (user) => {
    setLoading(true)
    await client.transaction({
      query: UPDATE_USER_QUERY,
      data: [
        user.name,
        user.email,
        user.phone,
        user.position,
        user.skype,
        avatar,
        user.email
      ],
    });
    setUser({
      ...user,
      position: user.position,
      skype: user.skype,
      avatar: avatar
    })
    setLoading(false)
  }

  const handleLogout = () => {
    setUser(null);
  }

  return <Container>
    <ScrollView>
      <Head>
        <Title>Edit Profile</Title>
        <RightAction>
          <TouchableOpacity onPress={handleLogout}>
            <RightActionText>
              Log out
            </RightActionText>
          </TouchableOpacity>
        </RightAction>
      </Head>
      <AvatarContainer>
        <UploadImage
          onChange={(value) => setAvatar(value)}
        >
          <ImageContainer>
            {avatar
              ? <StyledAvatarImage
                  source={{
                    uri: `data:image/png;base64,${avatar}`
                  }}
                />
              : <Avatar>
                {user?.name
                  ? <Name>
                    {user.name[0]}
                  </Name>
                  : null
                }
              </Avatar>
            }
            <EditAvatarContainer>
              <EditAvatar />
            </EditAvatarContainer>
          </ImageContainer>
        </UploadImage>
        {user?.name
          ? <Name>
            {user.name}
          </Name>
          : null
        }
        {user?.position
          ? <Position>
            {user.position}
          </Position>
          : null
        }
      </AvatarContainer>
      <Formik
        initialValues={user}
        onSubmit={onSubmit}
        validationSchema={SignupSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <Form>
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
            />
            <InputComponent
              disabled={false}
              placeholder='phone'
              label='Your Phone'
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              value={values.phone}
              hasError={!!errors.phone}
              errorText={errors.phone as string}
              touched={!!touched.phone}
            />
            <InputComponent
              disabled={false}
              placeholder='position'
              label='Position'
              onChangeText={handleChange('position')}
              onBlur={handleBlur('position')}
              value={values.position}
              hasError={!!errors.position}
              errorText={errors.position as string}
              touched={!!touched.position}
            />
            <InputComponent
              disabled={false}
              placeholder='skype'
              label='Skype'
              onChangeText={handleChange('skype')}
              onBlur={handleBlur('skype')}
              value={values.skype}
              hasError={!!errors.skype}
              errorText={errors.skype as string}
              touched={!!touched.skype}
            />

            <Button
              title='Save'
              onPress={() => handleSubmit(values)}
              disabled={loading}
            />
          </Form>
        )}
      </Formik>
    </ScrollView>
  </Container>
}

export default Profile;

const Container = styled.View`
  flex: 1;
`;

const Head = styled.View`
  min-width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  position: relative;
  padding: 0px 32px
`;

const AvatarContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 30px 0;
`;

const ImageContainer = styled.View`
  position: relative;
  width: 70px;
  height: 70px;
`;

const EditAvatarContainer = styled.View`
  position: absolute;
  right: 0;
  bottom: 0;
`;

const Title = styled.Text`
  color: #1F1D1D;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  text-transform: capitalize;
`;

const RightAction = styled.View`
  position: absolute;
  right: 27px;
`;

const RightActionText = styled.Text`
  color: #FFC612;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  padding: 5px;
`;

const Name = styled.Text`
  margin-top: 10px;
  color: #1F1D1D;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  text-transform: capitalize;
`;

const Avatar = styled.View`
  width: 70px;
  height: 70px;
  flex-shrink: 0;
  border-radius: 70px;
  background: #FFC612;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledAvatarImage = styled.Image`
  width: 70px;
  height: 70px;
  borderRadius: 70px;
  objectFit: cover;
  overflow: hidden;
`

const Position = styled.Text`
  margin-top: 3px;
  color: #9795A4;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  text-transform: capitalize;
`;

const Form = styled.View`
  maxWidth: 365px;
  width: 100%;
  padding: 0 32px;
  display: flex;
  flexDirection: column;
  margin: 0 auto 206px auto;
`;
