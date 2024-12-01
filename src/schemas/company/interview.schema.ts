import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";

const requireMess = (field: string) => {
  return {
    message: `${field} is required`,
  };
};

export const changeStatusSchema = toTypedSchema(
  zod.object({
    status: zod.number().default(0),
    interview_date_time: zod.string().nullable().optional(),
    expected_onboard_date: zod.string().nullable().optional(),
    note: zod.string().nullable().optional(),
  }),
  // .refine(
  //   (data) => {
  //     return !(
  //       data.status === INTERVIEW_DATE_SET &&
  //       isEmpty(data.interview_date_time)
  //     );
  //   },
  //   {
  //     message: "Interview Date is required",
  //     path: ["interview_date_time"],
  //   },
  // )
  // .refine(
  //   (data) => {
  //     return !(
  //       data.status === ONBOARD_DATE_SET &&
  //       isEmpty(data.expected_onboard_date)
  //     );
  //   },
  //   {
  //     message: "Expected onboard Date is required",
  //     path: ["expected_onboard_date"],
  //   },
  // ),
);
