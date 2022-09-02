import mysql from 'mysql';
import Config from './config';

const params = {
  user: Config.Mysql.user,
  password: Config.Mysql.password,
  host: Config.Mysql.host,
  database: Config.Mysql.database,
};

const Connect = async () => new Promise<mysql.Connection>((resolve, reject) => {
    const connection = mysql.createConnection(params);
    connection.connect((error) => {
      if (error) {
        console.log(error.message);
        reject(error);
        return;
      };
      resolve(connection);
    });
});

const Query = async (connection: mysql.Connection, query: string) => new Promise((resolve, reject) => {
  connection.query(query, connection, (error, result) => {
    if (error) {
      console.log(error.message);
      reject(error);
      return;
    };
    resolve(result);
  });
});

export { Connect, Query };
