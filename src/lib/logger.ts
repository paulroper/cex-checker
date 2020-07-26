const getLogPrefix = () => `[${new Date().toLocaleString()}]`;

export const log = (message: string): void => console.log(`${getLogPrefix()} ${message}`);
export const logError = (message: string): void => console.error(`${getLogPrefix()} ${message}`);
export const logWarning = (message: string): void => console.warn(`${getLogPrefix()} ${message}`);
