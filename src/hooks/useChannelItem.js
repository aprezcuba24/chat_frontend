const { useState, useEffect, useMemo } = require("react");
const { useAppContext } = require("../context/AppContext");
const { useEventSourceContext } = require("../context/EventContext");

export const useChannelItem = (channel) => {
  const { channelActive } = useAppContext();
  const { lastEvent } = useEventSourceContext();
  const [messageUnread, setMessageUnread] = useState({});
  useEffect(() => {
    if (!lastEvent || lastEvent['@type'] !== 'Message') {
      return;
    }
    setMessageUnread(prev => {
      if (channelActive && channelActive['@id'] === channel['@id']) {
        return { event: lastEvent, read: true };
      }
      if (prev.event && prev.event['@id'] === lastEvent['@id']) {
        return prev;
      }
      if (lastEvent.channel === channel['@id']) {
        return { event: lastEvent, read: false };
      }
      return prev;
    })
  }, [lastEvent, channelActive, channel]);
  const hasMessage = useMemo(() => messageUnread.event && !messageUnread.read, [messageUnread])

  return {
    hasMessage,
  }
};
