import api from "./api";

const getAll = (params) => {
  return api.get(`equipment`, {
    params,
  });
};

const create = (data) => {
  return api.post(`equipment`, data);
};

const getPublished = () => {
  return api.get(`equipment/published`);
};

const get = (id) => {
  return api.get(`equipment/${id}`);
};

const update = (id, data) => {
  return api.put(`equipment/${id}`, data);
};

const remove = (id) => {
  return api.delete(`equipment/${id}`);
};

const download = () => {
  return api.get(`equipment/download`);
};

export default {
  getAll,
  create,
  getPublished,
  get,
  update,
  remove,
  download,
};
