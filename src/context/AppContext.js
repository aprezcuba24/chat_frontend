import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getChannels, getWorkspaces } from '../services/chat';
import { useSecurityContext } from './SecurityContext';

const AppContext = createContext();

export const AppContextProvider = ({ children, ...props }) => {
  const { isAuthenticated, loadTokenByWorkspace, logout } = useSecurityContext();
  const [workspaces, setWorkspaces] = useState([]);
  const [channels, setChannels] = useState([]);
  const [workspaceActive, setWorkspaceActive] = useState(null);
  const changeWorkspace = useCallback(async workspace => {
    await loadTokenByWorkspace(workspace);
    setWorkspaceActive(workspace);
  }, [loadTokenByWorkspace])
  useEffect(() => {
    if (isAuthenticated) {
      getWorkspaces().then(data => {
        const workspaces = data['hydra:member'];
        setWorkspaces(workspaces);
        changeWorkspace(workspaces[0]);
      }).catch(error => {
        const { status } = error.getData();
        if (status === 401) {
          logout();
        }
      })
    }
  }, [isAuthenticated, changeWorkspace, logout])
  useEffect(() => {
    if (workspaceActive) {
      getChannels().then(data => setChannels(data['hydra:member']))
    }
  }, [workspaceActive])

  return (
    <AppContext.Provider {...props} value={{
      workspaces,
      workspaceActive,
      changeWorkspace,
      channels,
    }}>
      {children}
    </AppContext.Provider>
  );
};

AppContextProvider.propTypes = {
  children: PropTypes.object
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw Error('The `useAppContext` hook must be called from a descendent of the `AppContext`.');
  }

  return {
    workspaces: ctx.workspaces,
    changeWorkspace: ctx.changeWorkspace,
    workspaceActive: ctx.workspaceActive,
    channels: ctx.channels,
  };
};
