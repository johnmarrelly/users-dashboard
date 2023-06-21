import { useCallback } from 'react';
import { useHttp } from './use-http';
import { AxiosResponse } from 'axios';
import { getCookie } from 'auth/cookie.service';

export const useApiHttp = (): {
  error: any;
  sendRequest: ({
    endPoint,
    method,
    body,
    applyData,
  }: {
    endPoint: string;
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    body?: any;
    applyData?: (data: any) => void;
  }) => void;
  isLoading: boolean;
} => {
  const { error, sendRequest, isLoading } = useHttp();
  const token = getCookie('token');

  const sendCustomRequest = useCallback(
    async ({
      endPoint,
      method,
      body,
      applyData,
    }: {
      endPoint: string;
      method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
      body?: any;
      applyData?: (data: AxiosResponse<any, any>) => void;
    }) => {
      await sendRequest({
        url: `http://127.0.0.1:4000${endPoint}`,
        requestConfig: {
          method,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body,
        },
        applyData,
      });
    },
    [sendRequest, token]
  );

  return {
    error,
    isLoading,
    sendRequest: sendCustomRequest,
  };
};
