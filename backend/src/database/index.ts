import 'reflect-metadata';
import { Connection, createConnections } from 'typeorm';
import moduleLogger from '../shared/functions/logger';

const logger = moduleLogger('database');

export const dbConnection = (() => {
  let connections: Connection[];

  const createInstance = async (): Promise<Connection[]> => {
    try {
      return await createConnections();
    } catch (e) {
      console.log(e);
      return Promise.reject(e);
    }
  };

  return {
    getConnection: async (connectionName = 'default'): Promise<Connection> => {
      if (!connections) {
        logger.info('Creating new database connection...');
        connections = await createInstance();
      }

      const conn = connections.find(v => {
        return v.name === connectionName;
      });

      if (!conn) {
        throw new Error(`Connection ${connectionName} not found`);
      }

      return conn;
    },
  };
})();
