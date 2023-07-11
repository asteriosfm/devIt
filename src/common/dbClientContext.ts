import React from 'react';

import DataBaseClient from './db/client';

interface DBContext {
  client: DataBaseClient | null
}

const dbContext: DBContext = {
  client: null
}

export default React.createContext(dbContext);
