export const getLogger = (PKG_NAME: string) => {
  return (...args: string[]) => {
    console.log(`[${PKG_NAME}] `, ...args);
  };
};
