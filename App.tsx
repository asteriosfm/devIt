import React, { useState } from 'react';

import UserContext from './src/common/userContext';
import AppRouter from './src/AppRouter';
import getConnection from './src/common/db/connection';
import DBClientContext from './src/common/dbClientContext';


function App(): JSX.Element {
  const [user, setUser] = useState(null)

  return (<DBClientContext.Provider value={{ client: getConnection() }}>
    <UserContext.Provider value={{user, setUser}}>
      <AppRouter />
    </UserContext.Provider>
  </DBClientContext.Provider>
  );
}

export default App
