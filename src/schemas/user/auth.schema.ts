import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";

const requireMess = (field: string) => {
  return {
    message: `${field} is required`,
  };
};

export const userLoginSchema = toTypedSchema(
  zod.object({
    email: zod
      .string()
      .min(1, { message: "This is required" })
      .email({ message: "Must be a valid email" }),
    password: zod
      .string()
      .min(1, { message: "This is required" })
      .min(1, { message: "Too short" }),
  }),
);

export const userSignUpSchema = toTypedSchema(
  zod
    .object({
      email: zod
        .string()
        .min(1, { message: "This is required" })
        .email({ message: "Must be a valid email" }),
      first_name: zod.string().min(1, requireMess("First name")),
      last_name: zod.string().min(1, requireMess("Last name")),
      address: zod.string().min(1, requireMess("Address")),
      detail_address: zod.string().min(1, requireMess("Detail Address")),
      password: zod.string().min(1, requireMess("Password")),
      passwordConfirmation: zod
        .string()
        .min(1, requireMess("Password Confirmation")),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: "Password and Password Confirmation are different",
      path: ["passwordConfirmation"],
    }),
);
