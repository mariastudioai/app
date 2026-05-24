import React, { createContext, useContext, useState, useCallback } from 'react';

const AuthDialogContext = createContext(null);

export const AuthDialogProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState('signup');
  const [plan, setPlan] = useState(null);

  const openSignup = useCallback((selectedPlan = null) => {
    setTab('signup');
    setPlan(selectedPlan);
    setOpen(true);
  }, []);

  const openLogin = useCallback(() => {
    setTab('login');
    setPlan(null);
    setOpen(true);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  return (
    <AuthDialogContext.Provider value={{ open, tab, plan, setTab, openSignup, openLogin, close, setOpen }}>
      {children}
    </AuthDialogContext.Provider>
  );
};

export const useAuthDialog = () => {
  const ctx = useContext(AuthDialogContext);
  if (!ctx) throw new Error('useAuthDialog must be used within AuthDialogProvider');
  return ctx;
};
