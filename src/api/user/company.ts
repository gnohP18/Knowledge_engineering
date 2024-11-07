export const getListApi = (params: Object): Promise<any> => {
  return fetch("/data/user/companies.json")
    .then((res) => res.json())
    .then((d) => d.data);
};

export const getDetailApi = (id: string): Promise<any> => {
  return apiClient.get(`/user-service/companies/${id}`, {});
};
