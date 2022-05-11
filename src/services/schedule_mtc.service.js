import api from "./api";

const getAll = (params) => {
  return api.get(`schedule_mtc`, {
    params,
  });
};

const create = (data, onUploadProgress) => {
  return api.post(`schedule_mtc`, data, {
    onUploadProgress,
  });
};

const remove = (id) => {
  return api.delete(`schedule_mtc/${id}`, {
  });
};

const get = (id) => {
  return api.get(`schedule_mtc/${id}`);
};

const update = (id, data) => {
  return api.put(`schedule_mtc/${id}`, data);
};

const download = () => {
  return api.get(`schedule_mtc/download`);
};

export default {
  getAll,
  create,
  remove,
  get,
  update,
  download,
};
