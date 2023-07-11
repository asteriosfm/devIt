export interface User {
  name: string,
  email: string,
  phone: string,
  password: string,
  position?: string,
  skype?: string
  avatar?: string,
}

export const userDefault = {
  name: '',
  email: 'asteriosfm@gmail.com',
  password: '123456',
  position: '',
  skype: '',
  phone: '',
}
