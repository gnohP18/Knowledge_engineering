import type { UserLoginEntity } from "~/entities/user/auth";

export const loginApi = (userLogin: UserLoginEntity): Promise<any> => {
  // return axios
  //   .post(`${API_URL}/model/predict`, { text: text })
  //   .then((result) => {
  //     return result.data
  //   });
  const entity = {
    UserName: userLogin.email,
    password: userLogin.password,
  };

  return apiClient.post("/authen-service/auth/login", entity);
};
