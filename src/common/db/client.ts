import { Database, SQLError, SQLStatementErrorCallback, SQLTransaction } from 'expo-sqlite';


const error = (message) => {
  throw new Error(message)
}
const sqlError = (_: SQLTransaction, error: SQLError) => {
  throw new Error(error?.message)
}

interface SQLClientParams {
  query?: string,
  data?: any,
  onError?: SQLStatementErrorCallback
}

class Client {
  connected: boolean;

  constructor() {
    if (this.constructor === Client.prototype.constructor) {
      error('this is an abstract class')
    }
  }

  transaction(params: any): any {
    error('method is not implemented')
  }

  use(params: any): any {
    error('method is not implemented')
  }

  connect(params: any): any {
    error('method is not implemented')
  }
}

export class SQLiteClient extends Client {
  dbCLient: any;
  db: Database;

  constructor(dbClient) {
    super();
    this.dbCLient = dbClient;
    this.connected = false;
  }

  use(cb) {
    if (!this.connected) error('db is not connected')
    return cb();
  }

  transaction(params: SQLClientParams) {
    const { data, query, onError = sqlError } = params;
    return new Promise(resolve => {
      this.use(() => {
        this.db.transaction((transaction) => {
          transaction.executeSql(
            query,
            data,
            (_, resultSet) => {
              const { rows } = resultSet;
              resolve(rows)
            },
            onError
          );
        });
      })
    })
  }

  connect(params: SQLClientParams) {
    try {
      this.db = this.dbCLient.openDatabase('db');
    } catch (e) {
      params.onError(null, e)
      return
    }
    this.connected = true;
  }
}

export default class DataBaseClient {
  client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  use(operation, params: any) {
    const method = this.client[operation];
    if (method) {
      return method.call(this.client, params)
    }
  }

  transaction(params: any) {
    return this.client.transaction(params)
  }

  connect(params: any) {
    this.client.connect(params);
    return this
  }
}
