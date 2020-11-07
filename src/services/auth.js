import { request } from "./base"

export const login = (values) => {
  return request('/api/authentication_token', values, 'POST');
}