import { useCallback, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

export const useHttp = (): {
  error: any;
  sendRequest: (data: any) => any;
  isLoading: boolean;
} => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const sendRequest = useCallback(
    async ({
      url,
      requestConfig,
      applyData,
    }: {
      url: string;
      requestConfig: any;
      applyData: (data: AxiosResponse<any, any>) => Promise<void>;
    }) => {
      setIsLoading(true);
      try {
        const { method, headers, body } = requestConfig;

        const response = await axios({
          url,
          method: method ? method : 'GET',
          headers: headers ? headers : {},
          data: body ? body : null,
        });

        applyData(response);
      } catch (err: any) {
        setError(err.message as any);
      }

      setIsLoading(false);
    },
    []
  );
  return {
    error,
    isLoading,
    sendRequest,
  };
};
