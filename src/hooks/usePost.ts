// usePostApi.ts
import { useState, useCallback } from "react";
import apiClient from "../utils/interceptors";

interface PostApiOptions {
  url: string;
  pathParams?: Record<string, string | number>;
  headers?: Record<string, string>;
}

interface PostRequestPayload {
  data?: Record<string, any>;
  formData?: FormData;
  pathParams?: Record<string, string | number>;
  headers?: Record<string, string>;
}

export function usePostApi<T = any>(defaultOptions: PostApiOptions) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = useCallback(
    async (payload: PostRequestPayload = {}) => {
      try {
        setLoading(true);
        setError(null);

        let finalUrl = defaultOptions.url;

        const pathParams = payload.pathParams || defaultOptions.pathParams;
        if (pathParams) {
          Object.entries(pathParams).forEach(([key, value]) => {
            finalUrl = finalUrl.replace(`:${key}`, String(value));
          });
        }

        let body: any = null;
        let headers: Record<string, string> = {
          ...(defaultOptions.headers || {}),
          ...(payload.headers || {}),
        };

        if (payload.formData) {
          body = payload.formData;
          headers["Content-Type"] = "multipart/form-data";
        } else if (payload.data) {
          body = payload.data;
          headers["Content-Type"] = "application/json";
        }

        const response = await apiClient.post(finalUrl, body, { headers });

        setData(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    },
    [defaultOptions]
  );

  return { data, loading, error, submit };
}
