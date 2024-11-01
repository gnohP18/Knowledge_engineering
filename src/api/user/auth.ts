import { USER_TOKEN } from "~/constants/authentication";
import type { UserLoginEntity } from "~/entities/user/auth";

export const loginApi = (userLogin: UserLoginEntity): Promise<any> => {
  const entity = {
    UserName: userLogin.email,
    password: userLogin.password,
  };

  return apiClient.post("/authen-service/auth/login", entity);
};

export const getMeApi = (): Promise<any> => {
  return apiClient.get(`/user-service/users/get-me`, {}, USER_TOKEN);
};
