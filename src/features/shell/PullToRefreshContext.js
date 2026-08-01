import React, { createContext, useContext, useState } from 'react';

const PullToRefreshContext = createContext();

export function PullToRefreshProvider({ children }) {
  const [pullDistance, setPullDistance] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [disabled, setDisabled] = useState(false);

  return (
    <PullToRefreshContext.Provider value={{ pullDistance, setPullDistance, refreshing, setRefreshing, disabled, setDisabled }}>
      {children}
    </PullToRefreshContext.Provider>
  );
}

export function usePullToRefreshContext() {
  const context = useContext(PullToRefreshContext);
  if (!context) {
    return { pullDistance: 0, setPullDistance: () => {}, refreshing: false, setRefreshing: () => {}, disabled: false, setDisabled: () => {} };
  }
  return context;
}
