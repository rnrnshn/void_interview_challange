import axios from "axios";

const api = axios.create({
  baseURL: "https://sonil-dev.void.co.mz/api/v4",
});

export const saveAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export const userLogin = ({ username, password }) => {
  return api
    .post("/users/login", { username, password })
    .then((res) => res.data);
};

export const fetchAgriInputs = async () => {
  const response = await api.get(
    "analytics/farm-inputs/23e9336a-b20a-4478-a58f-875cc065e871?offset=1&limit=10?&filter=&phase=nurseries"
  );
  console.log(response.data.data);
  return response.data.data;
};
