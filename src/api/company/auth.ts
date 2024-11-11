import type { CompanyLoginEntity } from "~/entities/company/auth";

export const loginApi = (companyLogin: CompanyLoginEntity): Promise<any> => {
  const entity = {
    UserName: companyLogin.email,
    password: companyLogin.password,
  };

  return apiCompany.post("/authen-service/auth/login", entity);
};

export const getMeApi = (): Promise<any> => {
  return apiCompany.get("/user-service/companies/2");
};
