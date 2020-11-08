import { request } from "./base";

export const getWorkspaces = () => {
  return request('/api/workspaces');
};
