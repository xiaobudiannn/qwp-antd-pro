import request from 'utils/request';
import uri from 'utils/uri';

const mock = true;
const baseUri = {
  m: uri.component('system', 'xxx'),
  restfulApi: false,
  mock,
};

export async function $ (params) {
  const op = '$'
  return request({
    url: uri.ops({ op, ...baseUri }),
    method: 'post',
    body: params,
  })
}

export async function list (params) {
  const op = 'list'
  return request({
    url: uri.ops({ op, ...baseUri }),
    method: 'post',
    body: params,
  })
}
