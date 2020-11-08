import { request } from "./base"

export const login = (values) => {
  return request('/api/authentication_token', values, 'POST');
}

export const getTokenByWorkspace = workspace => {
  return request(`/api/authentication_token/${workspace.id}`);
}
