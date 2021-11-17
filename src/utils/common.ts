import { serviceStatusType } from "../api/getServicesStatus";

export const isNightServiceAvailable = (item: serviceStatusType) =>
  item.serviceTypes.filter((type) => type.name === "Night").length > 0;
export const areThereAnyDisruptions = (item: serviceStatusType) =>
  extractDisruptions(item).length > 0;
export const extractDisruptions = (item: serviceStatusType) =>
  item.lineStatuses.filter((item) => item.statusSeverity !== 10);
