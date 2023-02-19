const currentStorage = window.localStorage;

const getItem = (key: string) => {
  try {
    const value: string | null = currentStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (err) {
    return null;
  }
};

const setItem = (key: string, value: any) => {
  currentStorage.setItem(key, JSON.stringify(value));
};

const removeItem = (key: string) => {
  currentStorage.removeItem(key);
};

const clearAll = () => {
  currentStorage.clear();
};

export const storage = { getItem, setItem, removeItem, clearAll };
