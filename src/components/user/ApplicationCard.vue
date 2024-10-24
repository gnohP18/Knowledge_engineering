<script lang="ts" setup>
import type { ApplicationEntity } from "~/entities/user/application";
import { INTERVIEW_STATUS_NAME, INTERVIEW_TYPE } from "~/constants/application";
import { sleep } from "@whoj/utils-core";
import { MODE_COMPANY_VIEW, MODE_USER_VIEW } from "~/constants/common";

const props = defineProps({
  application: {
    type: Object as PropType<ApplicationEntity>,
  },
  mode: {
    type: String,
    default: MODE_USER_VIEW,
  },
});
</script>
<template>
  <Accordion
    v-if="props.application"
    :active-index="props.mode === MODE_USER_VIEW ? null : 0"
  >
    <AccordionTab>
      <template #header>
        <div class="w-full grid grid-cols-4 gap-2 justify-between">
          <span class="text-start"
            >Application ID {{ props.application?.id }}</span
          >
          <span class="text-start"
            >Job title: {{ props.application.job_title }}</span
          >
          <span v-if="props.mode === MODE_USER_VIEW"
            >Status:
            {{
              INTERVIEW_STATUS_NAME[
                props.application
                  ?.interview_status as keyof typeof INTERVIEW_STATUS_NAME
              ]
            }}</span
          >
          <span v-if="props.mode === MODE_USER_VIEW" class="ml-auto mr-2">
            {{ props.application?.interview_date_time }}
          </span>
        </div>
      </template>
      <div class="flex">
        <UserTimeline
          v-if="props.mode === MODE_USER_VIEW"
          :mode="MODE_USER_VIEW"
          :status="props.application?.interview_status"
          :interview-date-time="props.application?.interview_date_time"
        />
        <div class="w-2/3 flex border min-h-full gap-2 p-2 rounded-xl">
          <img
            :src="props.application.avatar"
            alt="avatar"
            class="rounded-full w-[150px] h-[150px] border-[1px] timeline-items"
          />
          <div class="flex flex-col flex-1 gap-2">
            <span class="w-full text-xl font-bold text-center"
              >{{ props.application.first_name }}
              {{ props.application.last_name }}</span
            >
            <hr class="h-[1px] w-full" />
            <div class="flex justify-center gap-2">
              <span>{{ props.application.address }}</span
              >| <span>{{ props.application.phone }}</span
              >|
              <span>{{ props.application.email }}</span>
            </div>
            <div class="flex justify-between">
              <span class="span-primary-hover"
                >Date of birth: {{ props.application.date_of_birth }}</span
              >
              <span class="span-primary-hover"
                >Address: {{ props.application.detail_address }}</span
              >
            </div>
            <div class="flex justify-between">
              <div class="flex gap-2">
                <Checkbox
                  v-model="props.application.is_married"
                  :binary="true"
                  disabled
                />
                <label for="is_married" class="font-bold span-primary-hover"
                  >Is married</label
                >
              </div>
              <div class="flex gap-2">
                <label for="gender" class="font-bold span-primary-hover"
                  >Gender:</label
                >
                <span class="span-primary-hover">{{
                  props.application.gender
                }}</span>
              </div>
            </div>
            <hr class="h-[1px] w-full" />
            <div class="flex flex-col">
              <label for="life_goal" class="font-bold span-primary-hover"
                >Life goal</label
              >
              <span class="min-h-[80px]">{{
                props.application.life_goal
              }}</span>
            </div>
            <hr class="h-[1px] w-full" />
            <div class="flex flex-col">
              <label for="life_goal" class="font-bold span-primary-hover"
                >Self introduce</label
              >
              <span class="min-h-[80px]">{{
                props.application.self_introduce
              }}</span>
            </div>
            <div class="flex justify-between">
              <div class="flex gap-2">
                <label for="job_type" class="font-bold span-primary-hover"
                  >Job title:</label
                >
                <span class="span-primary-hover">{{
                  props.application.job_title
                }}</span>
              </div>
              <div class="flex gap-2">
                <label for="job_type" class="font-bold span-primary-hover"
                  >Job name:</label
                >
                <span class="span-primary-hover">{{
                  props.application.job_name
                }}</span>
              </div>
            </div>
            <hr class="h-[1px] w-full" />
            <label class="font-bold span-primary-hover">{{
              props.application.company?.name
            }}</label>
            <div
              v-if="props.mode === MODE_USER_VIEW"
              class="flex flex-col gap-2"
            >
              <div class="flex gap-2">
                <label for="job_type" class="font-bold span-primary-hover"
                  >Interview type:</label
                >
                <span>{{
                  INTERVIEW_TYPE[
                    props.application
                      .interview_type as keyof typeof INTERVIEW_TYPE
                  ]
                }}</span>
              </div>
              <div class="flex gap-2">
                <label for="job_type" class="font-bold span-primary-hover"
                  >Interview Date:</label
                >
                <span>{{
                  props.application.interview_date_time
                    ? props.application.interview_date_time
                    : `Not set`
                }}</span>
              </div>
            </div>
            <div
              v-if="props.mode === MODE_USER_VIEW"
              class="flex gap-2 justify-between"
            >
              <div class="flex gap-2">
                <label for="job_type" class="font-bold span-primary-hover"
                  >Job application:</label
                >
                <span>{{ props.application.job?.position_name }}</span>
              </div>
              <div class="flex gap-2">
                <label for="job_type" class="font-bold span-primary-hover"
                  >Salary</label
                >
                <span
                  >{{ props.application.job?.salary_from }}$ -
                  {{ props.application.job?.salary_upto }}$</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </AccordionTab>
  </Accordion>
</template>
<style lang="scss" scoped>
:deep(.p-timeline-event-opposite) {
  flex: none !important;
}

.timeline-items {
  &:hover {
    border: 1px solid #11b9b5;
  }
}
</style>
