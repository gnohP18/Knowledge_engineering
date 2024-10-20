import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";

const requireMess = (field: string) => {
  return {
    required_error: `${field} is required`
  }
}

export const companyJobObject = zod.object({
  title: zod.string(requireMess('Title')),
  description: zod.string(requireMess('Description')),
  position_id: zod.number(requireMess('Position')),
  number_of_position: zod.number().default(0),
  type_of_employee: zod.number().default(1),
  type_of_interview: zod.number().default(1),
  working_time: zod.string().nullable().optional(),
  expected_on_board_date: zod.string().nullable().optional(),
  close_date: zod.string(requireMess('Close date')),
  address: zod.string(requireMess('Address')),
  status: zod.number().default(1),
  salary_from: zod.number().min(0).nullish().nullable(),
  salary_upto: zod.number().min(0).nullish().nullable(),
  job_attribute: zod.string(requireMess('Job Attribute')).array().nonempty({
    message: "Can't be empty!",
  })
});

export const companyJobSchema = toTypedSchema(companyJobObject);
