<script lang="ts" setup>
import { INTERVIEW_TYPE, TYPE_OF_EMPLOYEE } from "~/constants/job";
import { USER_CONNECTOR } from "~/constants/route";
import type { JobEntity } from "~/entities/user/job";
import { DEFAULT_AVATAR_URL } from "~/constants/common";
import { COMPANY_TYPE } from "~/constants/company";
import JobResumeListModal from "./job/JobResumeListModal.vue";
import { userResumeStore } from "~/stores/user/resume";
import { PAGE_LIMIT_DEFAULT } from "~/constants/pagination";

const props = defineProps({
  job: {
    type: Object as PropType<JobEntity>,
  },
});
const emits = defineEmits(["applyJob"]);
const resumeStore = userResumeStore();
const isLoading = computed(() => resumeStore.isLoading);

const goToElement = (elementId: string) => {
  document.getElementById(elementId)?.scrollIntoView({
    behavior: "smooth",
  });
};

const applyJob = (resumeId: number) => {
  emits("applyJob", resumeId);
};

const visibleResumeList = ref<boolean>(false);
const handleVisibleResumeModal = async () => {
  await resumeStore.getResumeList({ page: "1", limit: PAGE_LIMIT_DEFAULT });
  visibleResumeList.value = true;
};
</script>
<template>
  <div class="w-full primary-card p-3 flex flex-col gap-4">
    <span class="span-primary-hover text-3xl font-bold">
      {{ props.job?.title }}
    </span>
    <div v-if="props.job?.company">
      <div class="flex gap-x-2">
        <img
          :src="
            props.job?.company?.logo
              ? props.job?.company?.logo
              : DEFAULT_AVATAR_URL
          "
          alt=""
          class="w-[80px] h-[80px] rounded-full border"
        />
        <div class="flex flex-col">
          <label class="text-md font-bold"
            >Author - Company type:
            {{
              COMPANY_TYPE[
                props.job?.company?.company_type as keyof typeof COMPANY_TYPE
              ]
            }}</label
          >
          <a
            :href="`${USER_CONNECTOR}/company/${props.job?.company?.id}`"
            class="text-xl span-primary-hover"
            >{{ props.job?.company?.name }}</a
          >
          <div class="flex items-center justify-start gap-2">
            <div class="flex items-center justify-center gap-2">
              <span class="span-primary-hover">{{
                props.job.company.size
              }}</span>
              <span class="pi pi-users"></span>
            </div>
            <span class="text-md span-primary-hover">{{
              props.job?.company?.address
            }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col md:flex-row gap-y-2 md:gap-y-0 justify-between">
      <div class="flex flex-col md:flex-row gap-2">
        <span class="tag-item span-primary-hover rounded-md p-1">
          {{
            TYPE_OF_EMPLOYEE[
              props.job?.type_of_employee as keyof typeof TYPE_OF_EMPLOYEE
            ]
          }}
        </span>
        <span class="tag-item span-primary-hover rounded-md p-1">
          Interview
          {{
            INTERVIEW_TYPE[
              props.job?.interview_type as keyof typeof INTERVIEW_TYPE
            ]
          }}
        </span>
        <span
          v-if="props.job?.job_attribute"
          class="tag-item span-primary-hover rounded-md p-1"
          @click="goToElement('requirement')"
        >
          {{ props.job?.job_attribute?.length > 5 ? "+" : ""
          }}{{ props.job?.job_attribute?.length }} Requirement for this job
        </span>
      </div>
      <span
        v-if="props.job?.number_of_applicants"
        class="font-bold border border-[#11b9b5] span-primary-hover rounded-md p-1"
      >
        {{ props.job?.number_of_applicants }}
        {{ props.job?.number_of_applicants > 1 ? "applicants" : "applicant" }}
      </span>
    </div>
    <div class="flex items-center justify-between">
      <label class="font-bold text-2xl" for="description">About this job</label>
      <Button
        class="custom-button min-w-[150px] min-h-[50px] text-xl"
        :class="{ '!bg-white !text-black': props.job?.is_applied }"
        :label="props.job?.is_applied ? 'Applied' : 'Apply'"
        :loading="isLoading"
        @click="handleVisibleResumeModal"
      />
    </div>
    <div class="flex">
      <div class="flex gap-2 justify-center items-center">
        <span class="pi pi-info-circle span-primary-hover"></span>
        <label for="salary" class="span-primary-hover">Position Name</label>
        <span class="font-bold">{{ props.job?.position_name }}</span>
      </div>
    </div>
    <div class="flex">
      <div class="flex gap-2 justify-center items-center">
        <span class="pi pi-money-bill span-primary-hover"></span>
        <label for="salary" class="span-primary-hover">Salary</label>
        <span class="font-bold">{{
          convertSalary(props.job?.salary_from, props.job?.salary_upto)
        }}</span>
      </div>
    </div>

    <div class="flex">
      <div class="flex gap-2 justify-center items-center">
        <span class="pi pi-users span-primary-hover"></span>
        <label for="number_of_position" class="span-primary-hover"
          >Number of position</label
        >
        <span class="font-bold">{{ props.job?.number_of_position }}</span>
      </div>
    </div>

    <div class="flex">
      <div class="flex gap-2 justify-center items-center">
        <span class="pi pi-clock span-primary-hover"></span>
        <label for="salary" class="span-primary-hover">Working time</label>
        <span class="font-bold">{{ props.job?.working_time }}</span>
      </div>
    </div>

    <div class="flex">
      <div class="flex gap-2 justify-center items-center">
        <span class="pi pi-paperclip span-primary-hover"></span>
        <label for="salary" class="span-primary-hover"
          >Expected onboard date</label
        >
        <span class="font-bold">{{
          props.job?.expected_onboard_date
            ? convertDateTimeServer(props.job?.expected_onboard_date)
            : ""
        }}</span>
      </div>
    </div>

    <div class="flex">
      <div class="flex gap-2 justify-center items-center">
        <span class="pi pi-map-marker span-primary-hover"></span>
        <label for="salary" class="span-primary-hover">On site at</label>
        <span class="font-bold">{{ props.job?.address }}</span>
      </div>
    </div>

    <div class="border common-rounded p-3">
      <div
        class="whitespace-pre-wrap"
        v-html="escapeString(props.job?.description ?? '')"
      ></div>
    </div>
    <label id="requirement" class="font-bold text-2xl" for="requirement"
      >Job Requirements</label
    >
    <div class="flex flex-col gap-2 border common-rounded p-3">
      <Chip
        class="block w-fit tag-item"
        v-for="requirement in props.job?.job_attribute_names"
        :label="requirement"
      />
    </div>
    <JobResumeListModal
      :visible="visibleResumeList"
      @close="visibleResumeList = false"
      @choose="applyJob"
    />
  </div>
</template>
<style lang="scss" scoped>
.tag-item {
  background-color: #11b9b5;
  border: 1px solid #ffffff;
  color: #ffffff;
  width: fit-content;

  &:hover {
    border: 1px solid #11b9b5;
    background-color: #ffffff;
    color: #000000;
    transition: 0.5s;
  }
}
</style>
