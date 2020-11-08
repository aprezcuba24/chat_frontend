import { request } from "./base";

export const getWorkspaces = () => {
  return request('/api/workspaces');
};

export const getChannels = () => {
  return request('/api/channels')
}