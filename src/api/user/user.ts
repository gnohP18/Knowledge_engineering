import axios from "axios";
import { API_URL } from "~/constants/config";

export const getDetailApi = (): Promise<any> => {
  // return axios
  //   .post(`${API_URL}/model/predict`, { text: text })
  //   .then((result) => {
  //     return result.data
  //   });

  return fetch("/data/user/user.json")
    .then((res) => res.json())
    .then((d) => d.data);
};

export const getSuggestConnectorApi = (): Promise<any> => {
  // return axios
  //   .post(`${API_URL}/model/predict`, { text: text })
  //   .then((result) => {
  //     return result.data
  //   });

  return fetch("/data/user/suggest-connector.json")
    .then((res) => res.json())
    .then((d) => d.data);
};

export const getSuggestConnectorListApi = (params: Object): Promise<any> => {
  // return axios
  //   .post(`${API_URL}/model/predict`, { text: text })
  //   .then((result) => {
  //     return result.data
  //   });

  return fetch("/data/user/suggest-connectors.json")
    .then((res) => res.json())
    .then((d) => d.data);
};
