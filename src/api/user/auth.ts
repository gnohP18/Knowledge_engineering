import type { UserLoginEntity, UserSignupEntity } from "~/entities/user/auth";

export const loginApi = (userLogin: UserLoginEntity): Promise<any> => {
  const entity = {
    UserName: userLogin.email,
    password: userLogin.password,
  };

  return apiClient.post("/authen-service/auth/login", entity);
};

export const getMeApi = (): Promise<any> => {
  return apiClient.get(`/user-service/users/get-me`, {});
};

export const signupApi = (userSignup: UserSignupEntity): Promise<any> => {
  return apiClient.post("user-service/users/sign-up", userSignup);
};
