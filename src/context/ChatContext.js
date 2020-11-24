import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from './AppContext';
import { getMessages, sendMessage as sendMessageService } from '../services/chat';
import { useEventSourceContext } from './EventContext';

const ChatContext = createContext();

export const ChatContextProvider = ({ children, ...props }) => {
  const { channelActive } = useAppContext();
  const { lastEvent } = useEventSourceContext();
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    if (lastEvent && channelActive && lastEvent.channel === channelActive['@id']) {
      setMessages(prev => [lastEvent, ...prev])
    }
  }, [lastEvent, channelActive]);
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
    messages: ctx.messages,
    sendMessage: ctx.sendMessage,
  };
};