import { useEffect } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";

export const useEventSource = (callback, { topics, hubUrl, token } = {}) => {
  useEffect(() => {
    if (!topics) {
      return;
    }
    const url = new URL(hubUrl);
    topics.forEach(element => {
      url.searchParams.append('topic', element);
    });
    const eventSource = new EventSourcePolyfill(
      url,
      {
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    });
    eventSource.onmessage = callback;

    return () => eventSource.close();
  }, [callback, topics, token, hubUrl]);
};
