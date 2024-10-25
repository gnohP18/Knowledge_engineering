import type { AdminLoginEntity } from "~/entities/admin/auth";

export const loginApi = (adminLogin: AdminLoginEntity): Promise<any> => {
  // return axios
  //   .post(`${API_URL}/model/predict`, { text: text })
  //   .then((result) => {
  //     return result.data
  //   });

  return fetch("/data/admin/auth.json")
    .then((res) => res.json())
    .then((d) => d.data);
}