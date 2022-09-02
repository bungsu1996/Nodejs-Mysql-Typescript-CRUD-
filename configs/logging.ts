const getTimeStamp = (): string => {
  return new Date().toISOString();
}

const Info = (namespace: string, message: string, object?: any) => {
  if (object) {
    console.info(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`, object);
  } else {
    console.info(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`);
  };
};

const Warn = (namespace: string, message: string, object?: any) => {
  if (object) {
    console.warn(`[${getTimeStamp()}] [WARN] [${namespace} ${message}]`, object);
  } else {
    console.warn(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`);
  };
};

const Debug = (namespace: string, message: string, object?: any) => {
  if (object) {
    console.debug(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`, object);
  } else {
    console.debug(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`);
  };
};

const error = (namespace: string, message: string, object?: any) => {
  if (object) {
    console.error(`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`, object);
  } else {
    console.error(`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`);
  };
};

export default { Info, Warn, Debug, error };