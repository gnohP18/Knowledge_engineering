import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";

const requireMess = (field: string) => {
  return {
    required_error: `${field} is required`,
  };
};

const basicProfileSchema = zod.object({
  first_name: zod.string(requireMess("First name")),
  last_name: zod.string(requireMess("Last name")),
  date_of_birth: zod.string(requireMess("Date of birth")),
  address: zod.string(requireMess("Address")),
  detail_address: zod.string(requireMess("Detail Address")),
  email: zod
    .string(requireMess("Email"))
    .email({ message: "Must be a valid email" }),
  job_position: zod.number(requireMess("Job position")),
  self_introduce: zod.string().nullable().optional(),
  life_goal: zod.string().nullable().optional(),
  gender: zod.number(requireMess("Gender")),
  avatar: zod.string().nullable().optional(),
});

export const userUpdateSchema = toTypedSchema(basicProfileSchema);
