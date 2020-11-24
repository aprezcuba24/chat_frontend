import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useSecurityContext } from './SecurityContext';
import { useEventSource } from '../hooks/useEventSource';

const EventSourceContext = createContext();

export const EventSourceContextProvider = ({ children, ...props }) => {
  const { securityData } = useSecurityContext();
  const [lastEvent, setLastEvent] = useState();
  const listener = useCallback(event => {
    setLastEvent(JSON.parse(event.data));
  }, []);
  useEventSource(listener, securityData?.mercure);

  return (
    <EventSourceContext.Provider {...props} value={{
      lastEvent,
    }}>
      {children}
    </EventSourceContext.Provider>
  );
};

EventSourceContextProvider.propTypes = {
  children: PropTypes.object
};

export const useEventSourceContext = () => {
  const ctx = useContext(EventSourceContext);
  if (!ctx) {
    throw Error('The `useEventSourceContext` hook must be called from a descendent of the `EventSourceContext`.');
  }

  return {
    lastEvent: ctx.lastEvent,
  };
};
