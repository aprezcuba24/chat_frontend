import React, { memo, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSecurityContext } from '../../context/SecurityContext';

const ChatLayout = () => {
  const { isAuthenticated } = useSecurityContext();
  const { push } = useHistory();
  useEffect(() => {
    if (!isAuthenticated) {
      push('/')
    }
  }, [isAuthenticated, push]);

  return (
    <div>ChatLayout</div>
  );
};

export default memo(ChatLayout);