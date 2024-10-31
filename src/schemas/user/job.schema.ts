import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";

export const userJobSearchSchema = toTypedSchema(
  zod
    .object({
      salary_from: zod.number().nullish(),
      salary_upto: zod.number().nullish(),
    })
    .refine(
      (data) => {
        if (data.salary_from == null || data.salary_upto == null) {
          return true;
        }

        return data.salary_from < data.salary_upto;
      },
      {
        message: "Invalid salary range",
        path: ["salary_from", "salary_upto"],
      },
    ),
);
