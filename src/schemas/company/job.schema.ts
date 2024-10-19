import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";

export const companyJobObject = 
  zod.object({
    title: zod
      .string()
      .min(1, { message: "This field is required" }),

    description: zod
      .string()
      .min(1, { message: "This field is required" }),

    position_name: zod
      .number({message: 'This field must be a number'}),

    number_of_position: zod
      .number()
      .default(0),

    type_of_employee: zod
      .number()
      .default(1),
    
    type_of_interview: zod
      .number()
      .default(1),

    working_time: zod
      .string()
      .min(1, { message: "This field is required" }),
    
    close_date: zod
      .string()
      .min(1, { message: "This field is required" }),

    address: zod
      .string()
      .min(1, { message: "This field is required" }),

    media_file_id: zod
      .number()
      .nullable(),

    interview_date_time_id: zod
      .number()
      .nullable(),

    status: zod
      .number()
      .default(1),

    salary_from: zod.number().nullable(),
    salary_upto: zod.number().nullable(),
})

export const companyJobSchema = toTypedSchema(companyJobObject) 