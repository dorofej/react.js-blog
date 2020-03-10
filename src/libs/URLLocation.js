import { history } from '../store';
import URLParams from './URLParams';

export class URLLocation {
  /**
   * @param {Object.<string, string>} params
   * @param {boolean} cleanOld
   * @param {string} path
   * @return {void}
   */
  push = (
    params = {},
    cleanOld = false,
    path = window.location.pathname
  ) => {
    const oldParams = cleanOld ? {} : URLParams.parse(history.location.search);
    const _query = URLParams.serialize({ ...oldParams, ...params });
    const query = _query ? `?${_query}` : '';
    history.push(path + query);
  };

  /**
   * @param {string} key
   * @return {string}
   */
  get = (key) => {
    const params = URLParams.parse(history.location.search);
    return params[key];
  };
};

export default new URLLocation();
