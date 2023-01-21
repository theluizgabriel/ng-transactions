import axios from 'axios';

interface BodyLR {
  username: string;
  password: string;
}

interface BodyT {
  creditedAccountUser: string;
  value: number;
}

const api = axios.create({
  baseURL: `https://${process.env.REACT_APP_API_HOST}`,
});

export const setToken = (token: string) => {
  api.defaults.headers.common.Authorization = token;
};

export const requestData = async (endpoint: string) => {
  const { data } = await api.get(endpoint);
  return data;
};

export const requestLR = async (endpoint: string, body: BodyLR) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export const requestT = async (endpoint: string, body: BodyT) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export const requestUserById = async (id: string | number) => {
  const { data } = await api.get(`/users/${Number(id)}`);
  return data.username;
};

export default api;