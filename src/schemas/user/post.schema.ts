import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";

const requireMess = (field: string) => {
  return {
    required_error: `${field} is required`,
  };
};

export const userCreatePostSchema = toTypedSchema(
  zod.object({
    title: zod.string(),
    description: zod.string(),
  }),
);
