const Mock = require('mockjs')
const _ = require('lodash')

const queryArray = (array, key, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null
  }
  let data

  for (const item of array) {
    if (item[keyAlias] === key) {
      data = item
      break
    }
  }

  if (data) {
    return data
  }
  return null
}

const NOTFOUND = {
  success: false,
  message: 'Not Found',
  documentation_url: 'http://localhost:8000/request',
}

const INVALID_PARAMS = {
  success: false,
  message: 'Invalid parameters',
  documentation_url: 'http://localhost:8000/request',
}

const orgIds = [
  "320000198808308579",
  "320000197401148345",
  "520000197808143017",
  "320000198601213337",
  "540000200105065591",
  "640000198104205592",
  "360000197011177340",
  "230000197707188778",
  "52000020140718073X",
  "500000201011082144",
  "310000201105100723",
  "820000200805248759",
  "810000199702125601",
  "820000197602142570",
  "440000201008058358",
  "610000199903137150",
  "120000199502173584",
  "540000200602280057",
  "620000200805257121",
  "520000200607097258",
  "710000199702178160",
  "120000200007117150",
  "620000200103232712",
  "140000197204106230",
  "620000201308176114",
  "440000198203318966",
  "140000201404307116",
  "620000198106241614",
  "120000197301044066",
  "210000200507264108",
  "321000198808308579",
  "321000197401148345",
  "521000197808143017",
  "321000198601213337",
  "541000200105065591",
  "641000198104205592",
  "361000197011177340",
  "231000197707188778",
  "52100020140718073X",
  "501000201011082144",
  "311000201105100723",
  "821000200805248759",
  "811000199702125601",
  "821000197602142570",
  "441000201008058358",
  "611000199903137150",
  "121000199502173584",
  "541000200602280057",
  "621000200805257121",
  "521000200607097258",
  "711000199702178160",
  "121000200007117150",
  "621000200103232712",
  "141000197204106230",
  "621000201308176114",
  "441000198203318966",
  "141000201404307116",
  "621000198106241614",
  "121000197301044066",
  "211000200507264108",
  "322000198808308579",
  "322000197401148345",
  "522000197808143017",
  "322000198601213337",
  "542000200105065591",
  "642000198104205592",
  "362000197011177340",
  "232000197707188778",
  "52200020140718073X",
  "502000201011082144",
  "312000201105100723",
  "822000200805248759",
  "812000199702125601",
  "822000197602142570",
  "442000201008058358",
  "612000199903137150",
  "122000199502173584",
  "542000200602280057",
  "622000200805257121",
  "522000200607097258",
  "712000199702178160",
  "122000200007117150",
  "622000200103232712",
  "142000197204106230",
  "622000201308176114",
  "442000198203318966",
  "142000201404307116",
  "622000198106241614",
  "122000197301044066",
  "212000200507264108",
  "323000198808308579",
  "323000197401148345",
  "523000197808143017",
  "323000198601213337",
  "543000200105065591",
  "643000198104205592",
  "363000197011177340",
  "233000197707188778",
  "52300020140718073X",
  "503000201011082144",
  "313000201105100723",
  "823000200805248759",
  "813000199702125601",
  "823000197602142570",
  "443000201008058358",
  "613000199903137150",
  "123000199502173584",
  "543000200602280057",
  "623000200805257121",
  "523000200607097258",
  "713000199702178160",
  "123000200007117150",
  "623000200103232712",
  "143000197204106230",
  "623000201308176114",
  "443000198203318966",
  "143000201404307116",
  "623000198106241614",
  "123000197301044066",
  "213000200507264108",
]

let genOrgIdIdx = 0

const orgListData = Mock.mock({
  'data|80-100': [{
    id () {
      return orgIds[genOrgIdIdx++]
    },
    name: '@name',
    createTime: '@datetime',
  }],
})

const orgData = orgListData.data

const usersListData = Mock.mock({
  'data|1000-3000': [{
      id: '@id',
      name: '@name',
      account: '@string(lower, 6, 12)',
      nick_name: '@last',
      role: "@pick(['1', '2'])",
      phone: /^1[34578]\d{9}$/,
      'age|11-99': 1,
      address: '@county(true)',
      'gender|1': ['m', 'f'],
      email: '@email',
      create_time: '@datetime',
      password: '@string(6, 10)',
      org() {
        return orgData[Mock.Random.integer(0, orgData.length - 1)].id
      },
    },
  ],
})

function P (req, name, defaultValue) {
  const { query, body } = req
  if (body && !_.isUndefined(body[name])) return body[name]
  if (query && !_.isUndefined(query[name])) return query[name]
  return defaultValue
}

function PB (req, name, defaultValue) {
  const { body } = req
  if (body && !_.isUndefined(body[name])) return body[name]
  return defaultValue
}

const userData = usersListData.data

module.exports = {
  queryArray,
  NOTFOUND,
  INVALID_PARAMS,
  lang: 'zhCN',
  inDebug: () => false,
  orgData,
  userData,
  P,
  PB,
}