export default (query) => {
  const searchParams = new URLSearchParams();
  Object.keys(query)
    .filter((k) => query[k])
    .forEach((k) => searchParams.append(k, query[k]));

  return searchParams.toString();
};
