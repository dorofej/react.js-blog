/* eslint-disable import/first */
const l = require('../utils/log')(module);;

export default function accessStorage(...args) {
  l();

  let action, storageName, data;
  if (args.length === 1) {
    action = 'get';
    storageName = args[0];
  };

  if (args.length === 2) {
    action = 'set';
    storageName = args[0];
    data = args[1];
  };

  switch(action) {
    case 'set':
      localStorage.setItem(storageName, JSON.stringify(data));
      break;
    case 'get':
    default:
      return JSON.parse(localStorage.getItem(storageName));
  };
};
