import type { UserLoginEntity } from "~/entities/user/auth";

export const loginApi = (userLogin: UserLoginEntity): Promise<any> => {
  // return axios
  //   .post(`${API_URL}/model/predict`, { text: text })
  //   .then((result) => {
  //     return result.data
  //   });

  return fetch("/data/user/auth.json")
    .then((res) => res.json())
    .then((d) => d.data);
};
