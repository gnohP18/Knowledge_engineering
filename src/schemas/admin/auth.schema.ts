import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";

export const adminLoginSchema = toTypedSchema(
  zod.object({
    username: zod
      .string()
      .min(1, { message: "This is required" }),
    password: zod
      .string()
      .min(1, { message: "This is required" })
      .min(1, { message: "Too short" }),
  }),
);
