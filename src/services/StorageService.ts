export const StorageService = {
  parse(data) {
    return JSON.parse(data);
  },

  stringify(data) {
    return JSON.stringify(data);
  },

  get(key, shouldParse = true) {
    if (shouldParse) return this.parse(localStorage.getItem(key));
    return localStorage.getItem(key);
  },

  set(key, value, shouldStringify = true) {
    if (shouldStringify) {
      return localStorage.setItem(key, this.stringify(value));
    } else {
      return localStorage.setItem(key, value);
    }
  },
  delete(key) {
    localStorage.removeItem(key);
  },
  clear() {
    localStorage.clear();
  },
};
