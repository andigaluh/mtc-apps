import api from "./api";

const getAll = (params) => {
  return api.get(`schedule_mtc_excel`, {
    params,
  });
};

const create = (data, onUploadProgress) => {
  return api.post(`schedule_mtc_excel`, data, {
    onUploadProgress,
  });
};

const remove = (id) => {
  return api.delete(`schedule_mtc_excel/${id}`);
};

const get = (id) => {
  return api.get(`schedule_mtc_excel/${id}`);
};

export default {
  getAll,
  create,
  remove,
  get,
};
