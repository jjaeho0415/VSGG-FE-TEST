'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type LoginState = {
  isLogin: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  setLoginState: (
    isLogin: boolean,
    accessToken: string | null,
    refreshToken: string | null,
  ) => void;
};

export const useAuthStore = create<LoginState>(
  persist(
    (set) => ({
      isLogin: false,
      accessToken: null,
      refreshToken: null,
      setLoginState: (isLogin, accessToken, refreshToken) =>
        set({
          isLogin,
          accessToken,
          refreshToken,
        }),
    }),
    {
      name: 'login-storage',
    },
  ) as (set: (fn: (state: LoginState) => LoginState) => void) => LoginState,
);

export const getStoredLoginState = () => {
  const storedDataString = localStorage.getItem('login-storage');
  const storedData = storedDataString && JSON.parse(storedDataString);

  if (storedData) {
    const isLogin = storedData.state.isLogin;
    const accessToken = storedData.state.accessToken;
    const refreshToken = storedData.state.refreshToken;
    return { isLogin, accessToken, refreshToken };
  } else {
    return { isLogin: false, accessToken: null, refreshToken: null };
  }
};
