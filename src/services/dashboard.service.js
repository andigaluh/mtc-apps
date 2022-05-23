import api from "./api";

const getAllStatusMachine = () => {
    return api.get(`dashboard/status_machine`);
};

const getLatestStatusMachineNG = () => {
  return api.get(`dashboard/status_machine_ng`);
};

const getLatestStatusMachineOK = () => {
  return api.get(`dashboard/status_machine_ok`);
};

const getAllLatestMachine = () => {
  return api.get(`dashboard/status_machine_by_month_year`);
};

const getDetailLatestMachineNG = () => {
  return api.get(`dashboard/status_machine_by_ng`);
};

const getAlertParts = () => {
  return api.get(`dashboard/parts_alert`);
};

const getAlertTools = () => {
  return api.get(`dashboard/tools_alert`);
};

const getTotalProblemMachine = () => {
  return api.get(`dashboard/total_problem_machine`);
};

const getTotalProblemMachineInMonth = () => {
  return api.get(`dashboard/total_problem_machine_in_month`);
};

const getTotalMinutesProblem = () => {
  return api.get(`dashboard/total_minutes_problem`);
};

const getSummaryShift = () => {
  return api.get(`report-machine-check/check_machine_summary`);
};

export default {
  getAllStatusMachine,
  getLatestStatusMachineNG,
  getLatestStatusMachineOK,
  getAllLatestMachine,
  getDetailLatestMachineNG,
  getAlertParts,
  getAlertTools,
  getTotalProblemMachine,
  getTotalProblemMachineInMonth,
  getTotalMinutesProblem,
  getSummaryShift,
};
