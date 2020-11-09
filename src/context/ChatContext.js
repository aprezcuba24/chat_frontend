import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from './AppContext';
import { getMessages, sendMessage as sendMessageService } from '../services/chat';

const ChatContext = createContext();

export const ChatContextProvider = ({ children, ...props }) => {
  const { channels } = useAppContext();
  const [channelActive, setChannelActive] = useState();
  const [messages, setMessages] = useState([]);
  const changeChannel = useCallback(id => {
    const channel = channels.find(item => item.id === id);
    setChannelActive(channel);
  }, [channels]);
  useEffect(() => {
    if (channelActive) {
      getMessages(channelActive.id).then(data => setMessages(data['hydra:member']));
    } else {
      setMessages([])
    }
  }, [channelActive])
  const sendMessage = useCallback((body) => {
    return sendMessageService(body, channelActive['@id']);
  }, [channelActive])

  return (
    <ChatContext.Provider {...props} value={{
      channelActive,
      changeChannel,
      messages,
      sendMessage,
    }}>
      {children}
    </ChatContext.Provider>
  );
};

ChatContextProvider.propTypes = {
  children: PropTypes.object
};

export const useChatContext = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) {
    throw Error('The `useChatContext` hook must be called from a descendent of the `ChatContext`.');
  }

  return {
    channelActive: ctx.channelActive,
    changeChannel: ctx.changeChannel,
    messages: ctx.messages,
    sendMessage: ctx.sendMessage,
  };
};