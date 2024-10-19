import type { CompanyLoginEntity } from "~/entities/company/auth";

export const loginApi = (companyLogin: CompanyLoginEntity): Promise<any> => {
  // return axios
  //   .post(`${API_URL}/model/predict`, { text: text })
  //   .then((result) => {
  //     return result.data
  //   });

  return fetch("/data/company/auth.json")
    .then((res) => res.json())
    .then((d) => d.data);
}