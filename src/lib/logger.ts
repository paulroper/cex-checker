const getLogPrefix = () => `[${new Date().toLocaleString()}]`;

export const log = (message: string) => console.log(`${getLogPrefix()} ${message}`);
export const logError = (message: string) => console.error(`${getLogPrefix()} ${message}`);
export const logWarning = (message: string) => console.warn(`${getLogPrefix()} ${message}`);
