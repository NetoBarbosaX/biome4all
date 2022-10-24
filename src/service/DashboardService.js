import http from "../http-common";

export const getInfo = () => {
  return http
    .get("https://dev.b4adashboard.com/api/teste/teste3")
    .then((r) => r.data)
    .catch((e) => {
      throw e.response.data || e;
    });
};

