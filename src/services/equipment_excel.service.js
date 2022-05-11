import api from "./api";

const getAll = (params) => {
  return api.get(`equipment_excel`, {
    params,
  });
};

const create = (data, onUploadProgress) => {
  return api.post(`equipment_excel`, data, {
    onUploadProgress,
  });
};

const remove = (id) => {
  return api.delete(`equipment_excel/${id}`);
};

const get = (id) => {
  return api.get(`equipment_excel/${id}`);
};

export default {
  getAll,
  create,
  remove,
  get,
};
