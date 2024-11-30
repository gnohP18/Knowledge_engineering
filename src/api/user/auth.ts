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
  const entity = {
    email: userSignup.email,
    password: userSignup.password,
    first_name: userSignup.first_name,
    last_name: userSignup.last_name,
    job_position: userSignup.job_position,
    address: userSignup.address,
    detail_address: userSignup.detail_address,
    password_confirmation: userSignup.password_confirmation,
  };

  return apiClient.post("user-service/users/sign-up", entity);
};
