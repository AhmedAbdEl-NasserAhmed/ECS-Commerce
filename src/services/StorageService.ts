export const StorageService = {
  parse(data) {
    return JSON.parse(data);
  },

  stringify(data) {
    return JSON.stringify(data);
  },

  get(key) {
    return this.parse(localStorage.getItem(key));
  },

  set(key, value) {
    return localStorage.setItem(key, this.stringify(value));
  },
};
