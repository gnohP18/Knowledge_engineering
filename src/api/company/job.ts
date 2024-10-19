export const getIndexJobApi = (params: Object): Promise<any> => {
  // return axios
  //   .post(`${API_URL}/model/predict`, { text: text })
  //   .then((result) => {
  //     return result.data
  //   });

  return fetch("/data/company/jobs.json").then((res) => res.json());
};

export const getListPositionNameApi = (): Promise<any> => {
  // return axios
  //   .post(`${API_URL}/model/predict`, { text: text })
  //   .then((result) => {
  //     return result.data
  //   });

  return fetch("/data/company/position_name.json")
    .then((res) => res.json())
    .then((d) => d.data);
};
