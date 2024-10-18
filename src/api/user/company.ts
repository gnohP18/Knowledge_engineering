import axios from "axios";
import { API_URL } from "~/constants/config";

export const getListApi = (params: Object): Promise<any> => {
  // return axios
  //   .get(`${API_URL}/files?type=crawl_data`)
  //   .then((result) => {
  //     return result.data
  //   });

  return fetch("/data/user/companies.json")
    .then((res) => res.json())
    .then((d) => d.data);
};

export const getDetailApi = (id: string): Promise<any> => {
  // return axios
  //   .get(`${API_URL}/files?type=crawl_data`)
  //   .then((result) => {
  //     return result.data
  //   });

  return fetch("/data/user/company.json")
    .then((res) => res.json())
    .then((d) => d.data);
};
