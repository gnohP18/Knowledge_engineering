<script lang="ts" setup>
import { TYPE_OF_EMPLOYEE } from "~/constants/job";
import { USER_JOB } from "~/constants/route";
import type { AttachmentJob } from "~/entities/user/job";

const props = defineProps({
  jobs: {
    type: Array<AttachmentJob>,
  },
});
</script>
<template>
  <div class="w-full primary-card p-3 flex flex-col gap-4">
    <div
      v-for="job in props.jobs"
      class="w-full grid grid-cols-6 border rounded-md p-3"
    >
      <CommonLimitSpan
        class="text-left"
        :text="job.title"
        :limit="5"
        is-primary-text
      />
      <span class="text-center span-primary-hover">
        {{ job.position_name }}
      </span>
      <span
        class="text-center span-primary-hover"
        v-if="job.salary_from || job.salary_upto"
      >
        {{ job.salary_from ? "$" : "" }}{{ job.salary_from }} ~
        {{ job.salary_upto ? "$" : "" }}{{ job.salary_upto }}
      </span>
      <span class="text-center span-primary-hover" v-else> Negotiate </span>
      <span class="text-center span-primary-hover">
        {{
          TYPE_OF_EMPLOYEE[
            job.type_of_employee as keyof typeof TYPE_OF_EMPLOYEE
          ]
        }}</span
      >
      <span class="text-center span-primary-hover"> {{ job.address }}</span>
      <a
        :href="`${USER_JOB}/${job.id}`"
        class="pi pi-eye icon-movement text-right pr-4"
      ></a>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
