import axios from "axios";

export const AxiosWithInterseptor = axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Відправка запиту на оновлення токену
        const response = await axios.post(
          "/api/auth/refresh",
          {},
          {
            withCredentials: true,
          }
        );
        const newAccessToken = response.data.AccessToken;
        console.log(newAccessToken);
        // Оновлення токену у локальному сховищі (якщо потрібно)
        // Повторення оригінального запиту з оновленим токеном доступу
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } catch (error) {
        // Обробка помилки оновлення токену
        // Можливо, перенаправлення на сторінку входу або інша обробка помилки
        console.error("Token refresh failed:", error);
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export const AccountFetch = (url: string) => {};
