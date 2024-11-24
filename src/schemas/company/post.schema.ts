import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";

const requireMess = (field: string) => {
  return {
    required_error: `${field} is required`,
  };
};

const baseCompanyPostSchema = zod.object({
  title: zod.string().min(1, { message: "This is required" }),
  description: zod.string().min(1, { message: "This is required" }),
  status: zod.number().nullish(),
  hashtags: zod.string(requireMess("Hashtag")).array().nonempty({
    message: "Can't be empty!",
  }),
});

export const companyPostSchema = toTypedSchema(baseCompanyPostSchema);
