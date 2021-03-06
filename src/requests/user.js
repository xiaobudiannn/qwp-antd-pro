import request from 'utils/request';
import uri from 'utils/uri';

const mock = true;
const baseUri = {
  m: uri.component('system', 'user', 'users'),
  restfulApi: false,
  mock,
};

export function getFileUploadUrl() {
  return uri.ops({ op: 'upload_avatar', ...baseUri })
}

export function getUserAvatarUrl(params) {
  return uri.ops({ op: 'avatar', ...baseUri, ...params })
}

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

export async function create (params) {
  const op = 'create'
  return request({
    url: uri.ops({ op, ...baseUri }),
    method: 'post',
    body: params,
  })
}

export async function remove (params) {
  const op = 'del'
  return request({
    url: uri.ops({ op, ...baseUri }),
    method: 'post',
    body: params,
  })
}

export async function update (params) {
  const op = 'edit'
  return request({
    url: uri.ops({ op, ...baseUri }),
    method: 'post',
    body: params,
  })
}

