import api from "./api";

const API_URL = process.env.REACT_APP_API;

const getAll = (params) => {
  return api.get(`${API_URL}machine-check`, {
    params,
  });
};

const create = (data) => {
  return api.post(`${API_URL}machine-check`, data);
};

const getPublished = () => {
  return api.get(`${API_URL}machine-check/published`);
};

const get = (id) => {
  return api.get(`${API_URL}machine-check/${id}`);
};

const update = (id, data) => {
  return api.put(`${API_URL}machine-check/${id}`, data);
};

const updateParts = (id, data) => {
  return api.put(`${API_URL}machine-check/parts/${id}`, data);
};

const remove = (id) => {
  return api.delete(`${API_URL}machine-check/${id}`);
};

const approval = (id, data) => {
  return api.put(`${API_URL}machine-check/appr/${id}`, data);
};

const findAppr = (params) => {
  return api.get(`${API_URL}machine-check/find-appr`, {
    params,
  });
};

export default {
  getAll,
  create,
  getPublished,
  get,
  update,
  remove,
  updateParts,
  approval,
  findAppr,
};
