export class URLParams {
  /**
   * @param {Object.<string, string>} query
   * @return {string}
   */
  serialize = (query) => {
    const searchParams = new URLSearchParams();
    Object.keys(query)
      .filter((k) => query[k])
      .forEach((k) => searchParams.append(k, query[k]));

    return searchParams.toString();
  };

  /**
   * @param {string} search
   * @return {Object.<string, string>}
   */
  parse = (search) => {
    const searchParams = new URLSearchParams(search);
    const params = {};
    const keys = searchParams.keys();
    for (let k of keys) {
      params[k] = searchParams.get(k);
    };
    return params;
  };
};

export default new URLParams();
