// useGetApi.ts
import { useState, useCallback, useEffect } from "react";
import apiClient from "../utils/interceptors";

interface GetApiOptions {
  url: string;
  pathParams?: Record<string, string | number>;
  queryParams?: Record<string, string | number | boolean>;
  headers?: Record<string, string>;
  autoFetch?: boolean; // 👈 new option for automatic fetch
}

export function useGetApi<T = any>(defaultOptions: GetApiOptions) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const buildUrl = (opts: GetApiOptions) => {
    let finalUrl = opts.url;

    // Replace :params in URL
    if (opts.pathParams) {
      Object.entries(opts.pathParams).forEach(([key, value]) => {
        finalUrl = finalUrl.replace(`:${key}`, String(value));
      });
    }

    return finalUrl;
  };

  const get = useCallback(
    async (overrideOptions: Partial<GetApiOptions> = {}) => {
      const opts: GetApiOptions = {
        ...defaultOptions,
        ...overrideOptions,
        pathParams: { ...defaultOptions.pathParams, ...overrideOptions.pathParams },
        queryParams: { ...defaultOptions.queryParams, ...overrideOptions.queryParams },
        headers: { ...defaultOptions.headers, ...overrideOptions.headers },
      };

      try {
        setLoading(true);
        setError(null);

        const finalUrl = buildUrl(opts);

        const response = await apiClient.get(finalUrl, {
          params: opts.queryParams,
          headers: opts.headers,
        });

        setData(response.data);
        return response.data;
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || "Something went wrong");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [defaultOptions]
  );

  // Auto fetch on mount (if autoFetch true)
  useEffect(() => {
    if (defaultOptions.autoFetch) {
      get();
    }
  }, [get, defaultOptions.autoFetch]);

  return { data, loading, error, get };
}
