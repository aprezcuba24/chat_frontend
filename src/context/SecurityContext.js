import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getTokenByWorkspace, login as loginService } from '../services/auth';

const SecurityContext = createContext();

export const SecurityContextProvider = ({ children, ...props }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [securityData, setSecurityData] = useState();
  const loadTokenByWorkspace = useCallback(async workspace => {
    const data = await getTokenByWorkspace(workspace);
    setSecurityData(data);
    localStorage.setItem('token', data.token);
  }, [])
  const login = useCallback(async (values) => {
    const { token } = await loginService(values);
    setIsAuthenticated(true);
    localStorage.setItem('token', token);
  }, []);
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  }, [])
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true)
    }
  }, [])

  return (
    <SecurityContext.Provider {...props} value={{
      isAuthenticated,
      login,
      loadTokenByWorkspace,
      logout,
      securityData,
    }}>
      {children}
    </SecurityContext.Provider>
  );
};

SecurityContextProvider.propTypes = {
  children: PropTypes.object
};

export const useSecurityContext = () => {
  const ctx = useContext(SecurityContext);
  if (!ctx) {
    throw Error('The `useSecurityContext` hook must be called from a descendent of the `SecurityContext`.');
  }

  return {
    isAuthenticated: ctx.isAuthenticated,
    login: ctx.login,
    loadTokenByWorkspace: ctx.loadTokenByWorkspace,
    logout: ctx.logout,
    securityData: ctx.securityData,
  };
};