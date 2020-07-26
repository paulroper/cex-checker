import { resolve } from 'path';

import { logError } from './logger';

export interface Config {
  checkInterval?: number;
  email: {
    host: string;
    password: string;
    port: number;
    secure: boolean;
    username: string;
  }
}

export const loadConfig = (configPath: string): Config | undefined => {
  try {
    const config: Config = require(resolve(process.cwd(), configPath));
    return config;
  } catch (e) {
    logError(`Failed to load config file: ${configPath}\n`);
    return;
  }
}
