import React, { useState } from 'react';

import UserContext from './src/common/userContext';
import AppRouter from './src/AppRouter';
import getConnection from './src/common/db/connection';
import DBClientContext from './src/common/dbClientContext';
import WithFonts from './src/common/WithFonts';


interface Props {
  fontsLoaded: boolean,
}

const App: React.FC<Props> = () => {
  const [user, setUser] = useState(null)

  return (<WithFonts>
    <DBClientContext.Provider value={{ client: getConnection() }}>
      <UserContext.Provider value={{user, setUser}}>
        <AppRouter />
      </UserContext.Provider>
    </DBClientContext.Provider>
  </WithFonts>
  );
}

export default App