import axios from 'axios';
import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';

// In case use 'baseURL', update 'axios.get' to 'api.get'
// const api = axios.create({
//   baseURL: 'https://api.github.com',
// });

export function useFetch<T = unknown>(url: string, options?: AxiosRequestConfig) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null)
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    axios.get(url, options)
      // on success
      .then(response => {
        setData(response.data);
      })
      // on error
      .catch(err => {
        setError(err);
      })
      // on success or error (alway)
      .finally(() => {
        setIsFetching(false);
      })
  }, [])

  return { data, error, isFetching }
}