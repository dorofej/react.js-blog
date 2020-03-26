import { get, set } from 'idb-keyval';

export class Storage {
  get = (key) => {
    return get(key);
  };

  set = (key, value) => {
    return set(key, value);
  };
};

export default new Storage();
