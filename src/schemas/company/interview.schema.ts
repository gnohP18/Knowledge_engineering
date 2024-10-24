import { toTypedSchema } from "@vee-validate/zod";
import { isEmpty } from 'lodash-es';
import * as zod from "zod";
import { INTERVIEW_DATE_SET } from "~/constants/application";

const requireMess = (field: string) => {
  return {
    required_error: `${field} is required`,
  };
};

export const changeStatusSchema = toTypedSchema(
  zod.object({
    status: zod.number().default(0),
    interview_date_time: zod.string(requireMess("Close date")),
  }).refine((data) => {
    return !(data.status === INTERVIEW_DATE_SET && isEmpty(data.interview_date_time));
  }, {
    message: "Interview Date is required",
    path: ['interview_date_time'],
  }),
);
