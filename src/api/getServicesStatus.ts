export type serviceStatusType = 
  {
    id: string;
    name: string;
    modeName: string;
    lineStatuses: {
      id: number;
      lineId: string;
      statusSeverity: number;
      reason: string;
    }[];
    serviceTypes: {
      name: string;
    }[];
  };

export const getServicesStatus = (): Promise<serviceStatusType[]> => {
  return new Promise((resolve, reject) => {
    fetch('https://api.tfl.gov.uk/Line/Mode/tube,overground,dlr/Status?detail=true')
      .then(res => res.json())
      .then((res: serviceStatusType[]) => {
        resolve(res);
      })
      .catch(e => reject(e));
  });  
}