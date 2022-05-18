import api from "./api";

const API_URL = process.env.REACT_APP_API;

const getAll = (params) => {
  return api.get(`${API_URL}report-machine-check`, {
    params,
  });
};

const create = (data) => {
  return api.post(`${API_URL}report-machine-check`, data);
};

const getPublished = () => {
  return api.get(`${API_URL}report-machine-check/published`);
};

const get = (id) => {
  return api.get(`${API_URL}report-machine-check/${id}`);
};

const update = (id, data) => {
  return api.put(`${API_URL}report-machine-check/${id}`, data);
};

const updateParts = (id, data) => {
  return api.put(`${API_URL}report-machine-check/parts/${id}`, data);
};

const remove = (id) => {
  return api.delete(`${API_URL}report-machine-check/${id}`);
};

const download = () => {
  return api.get(`${API_URL}report-machine-check/download`);
};

const updatePartsCondition = (machine_check_id, parts_id, data) => {
  return api.put(
    `${API_URL}report-machine-check/parts/${machine_check_id}/${parts_id}`,
    data
  );
};

const statusUpdatedParts = (machine_check_id) => {
  return api.get(
    `${API_URL}report-machine-check/statusUpdated/${machine_check_id}`
  );
};

export default {
  getAll,
  create,
  getPublished,
  get,
  update,
  remove,
  updateParts,
  download,
  updatePartsCondition,
  statusUpdatedParts,
};
