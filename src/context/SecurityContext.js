import React, { createContext, useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { login as loginService } from '../services/auth';

const SecurityContext = createContext();

export const SecurityContextProvider = ({ children, ...props }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const login = useCallback(async (values) => {
    const { token } = await loginService(values);
    setIsAuthenticated(true);
    localStorage.setItem('token', token);
  }, []);

  return (
    <SecurityContext.Provider {...props} value={{
      isAuthenticated,
      login,
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
  };
};