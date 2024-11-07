import type { CompanyLoginEntity } from "~/entities/company/auth";

export const loginApi = (companyLogin: CompanyLoginEntity): Promise<any> => {
  const entity = {
    UserName: companyLogin.email,
    password: companyLogin.password,
  };

  return apiCompany.post("/authen-service/auth/login", entity);
};
