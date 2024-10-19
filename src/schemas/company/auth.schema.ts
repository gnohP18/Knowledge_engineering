import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";

export const companyLoginSchema = toTypedSchema(
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
