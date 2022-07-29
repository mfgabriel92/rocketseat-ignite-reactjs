import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { parseCookies } from "nookies";
import { setCookies } from "../utils/cookies";

interface ErrorResponse extends AxiosError {
  code?: string;
}

const cookies = parseCookies();
let failedRequestsQueue = [];
let isRefreshing = false;

const api = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    Authorization: `Bearer ${cookies["@rocketseatIgniteReactJSChapterIV_token"]}`,
  },
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ErrorResponse>) => {
    switch (error.response.status) {
      case 401: {
        handleRefreshToken(error);
      }
    }
  },
);

function handleRefreshToken(error: AxiosError<ErrorResponse>) {
  if (error.response.data?.code === "token.expired") {
    const { "@rocketseatIgniteReactJSChapterIV_refreshToken": refreshToken } = parseCookies();
    const config = error.config;

    if (!isRefreshing) {
      isRefreshing = true;
      doRefreshToken(refreshToken);
    }

    return new Promise((resolve, reject) => {
      failedRequestsQueue.push({
        onSuccess: (token: string) => onResolvePromise(token, config, resolve),
        onError: (error: AxiosError) => onRejectPromise(error, reject),
      });
    });
  }
}

function doRefreshToken(refreshToken: string) {
  api
    .post("http://localhost:3333/refresh", { refreshToken })
    .then((response) => {
      const { token, refreshToken } = response?.data;
      setCookies("token", token);
      setCookies("refreshToken", refreshToken);
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      failedRequestsQueue.forEach((request) => request.onSuccess(token));
      failedRequestsQueue = [];
    })
    .catch((error) => {
      failedRequestsQueue.forEach((request) => request.onError(error));
      failedRequestsQueue = [];
    })
    .finally(() => {
      isRefreshing = false;
    });
}

function onResolvePromise(token: string, config: AxiosRequestConfig, resolve) {
  config.headers.Authorization = `Bearer ${token}`;
  resolve(api(config));
}

function onRejectPromise(error: AxiosError, reject) {
  reject(error);
}

export default api;
