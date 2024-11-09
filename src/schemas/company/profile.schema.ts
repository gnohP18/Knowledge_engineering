import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";

const requireMess = (field: string) => {
  return {
    message: `${field} is required`,
  };
};

const basicProfileSchema = zod.object({
  name: zod.string().min(1, requireMess("Name")),
  name_in_charge: zod.string().min(1, requireMess("Name in charge")),
  note: zod.string().nullable().optional(),
  phone: zod.string().min(1, requireMess("Phone")),
  email: zod
    .string()
    .min(1, requireMess("Email"))
    .email({ message: "Must be a valid email" }),
  logo: zod.string().nullable().optional(),
  company_type: zod.number(),
  size: zod.number(),
  address: zod.string().min(1, requireMess("Address")),
  detail_address: zod.string().nullable().optional(),
  accessibility: zod.string().nullable().optional(),
  closed_day: zod.string().min(1, requireMess("Close day")),
  business_day: zod.string().min(1, requireMess("Business day")),
  workplace: zod.number().nullish(),
});

export const companyUpdateSchema = toTypedSchema(basicProfileSchema);
