export const getItem = (key: string) => {
  const item = window.localStorage.getItem(key);
  return JSON.parse(item || "null");
};

export const setItem = (key: string, value: any) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const removeItem = (key: string) => {
  window.localStorage.removeItem(key);
};
