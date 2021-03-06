/* eslint-disable no-unused-vars */

const Mock = require('mockjs')
const _ = require('lodash')

/* eslint-enable global-require */
const {
  queryArray,
  NOTFOUND,
  INVALID_PARAMS,
  P,
} = require('../common');
const {
  createOps,
} = require('../crud');

const routerPath = '/sample/profile/books';
const L = {};

// all you need is to change the data rule and other page settings
const myOps = createOps({
  name: '@name',
  description: '@string(lower, 6, 12)',
  create_time: '@datetime',
  tags() {
    return Mock.mock({
      'data|3-6': ['@string(lower, 6, 12)'],
    }).data;
  }
}, routerPath, L, {
  books: {
    names: [
      ["name", "Name", "10", true, true],
      ["tags", "Tags", "30"],
      ["create_time", "Time", "10", true, true],
      ["description", "Description", "20"],
      ["", "", "10", false, "operation"],
    ],
  },
}, {
  books: {
    id: { required: true, 'digits': true, op: 'edit', ui: false },
    name: { required: true, rangelength: [1, 256], 'op_edit': 2, name: '书名' },
    description: { rangelength: [1, 256], name: '描述' },
  },
  search: {
    name: { rangelength: [1, 256], name: '书名' },
    description: { rangelength: [1, 256], name: '描述' },
    create_time: { date: true, name: '创建时间' },
  },
}, {
  create_time: (item, filter) => {
    const filterTime = new Date(filter).getTime();
    const itemTime = new Date(item).getTime();

    if (filterTime) {
      return itemTime >= filterTime;
    }
    return true;
  },
});

module.exports = {
  ops: {
    ...myOps,
    // other ops if need
  },
}
