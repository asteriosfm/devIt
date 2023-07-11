import * as SQLite from 'expo-sqlite';

import DataBaseClient, { SQLiteClient } from './client';
import { CREEATE_USERS_TABLE_QUERY } from './queries';


const sqlClient = new SQLiteClient(SQLite);
const dbClient = new DataBaseClient(sqlClient)

const getConnection = () => {
  dbClient
    .connect({
      onError: (_, err) => {
        throw new Error(err)
      }
    })
    .transaction({
      query: CREEATE_USERS_TABLE_QUERY
    })
  return dbClient;
}

export default getConnection;
