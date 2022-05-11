import api from "./api";

const getAll = (params) => {
    return api.get(`parts_excel`, {
    params,
  });
};

const create = (data, onUploadProgress) => {
  return api.post(`parts_excel`, data, {
    onUploadProgress,
  });
};

const remove = (id) => {
  return api.delete(`parts_excel/${id}`);
};

const get = (id) => {
  return api.get(`parts_excel/${id}`);
};

export default {
  getAll,
  create,
  remove,
  get
};
