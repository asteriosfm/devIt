import React, { Dispatch, SetStateAction } from 'react';

import { User } from './types/User';


interface UserContext {
  user: User | null,
  setUser: Dispatch<SetStateAction<UserContext['user']>>,
}

const userContext: UserContext = {
  user: null,
  setUser: () => {}
}

export default React.createContext(userContext);
