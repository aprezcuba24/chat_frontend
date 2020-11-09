import { request } from "./base";

export const getWorkspaces = () => {
  return request('/api/workspaces');
};

export const getChannels = () => {
  return request('/api/channels')
}

export const getMessages = (channelId) => {
  return request(`/api/channels/${channelId}/messages`);
}

export const sendMessage = (body, channel) => {
  return request('/api/messages', {
    ...body,
    channel,
  }, 'POST');
}
