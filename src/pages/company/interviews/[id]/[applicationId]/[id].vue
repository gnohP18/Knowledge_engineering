<script setup lang="ts">
import { useForm } from "vee-validate";
import KTADropdown from "~/components/common/KTADropdown.vue";
import Validate from "~/components/common/Validate.vue";
import {
  INTERVIEW_DATE_SET,
  INTERVIEW_STATUS_NAME,
  INTERVIEW_TYPE,
  ONBOARD_DATE_SET,
} from "~/constants/application";
import { INTERVIEW_STATUS_OPTIONS } from "~/constants/application";
import type { OptionSelect } from "~/entities/common";
import { changeStatusSchema } from "~/schemas/company/interview.schema";
import { InterviewStore } from "~/stores/company/interview";
import KTACalendar from "~/components/common/KTACalendar.vue";
import { GENDER } from "~/constants/common";
import KTATextArea from "~/components/common/KTATextArea.vue";

const pageTitle = "Applications";
useHead({ title: pageTitle });
definePageMeta({
  layout: "company",
  middleware: "auth-company",
});

const route = useRoute();
const router = useRouter();

const store = InterviewStore();
const isLoading = computed(() => store.isLoading);
const isSucceed = computed(() => store.isSucceed);
const application = computed(() => store.application);
const statusOptionSelected = ref<OptionSelect>();
const interviewDateTimeSelected = ref<Date>();
const expectedOnboardDateSelected = ref<Date>();

const { setFieldValue, handleSubmit, errors, defineField } = useForm({
  validationSchema: changeStatusSchema,
});
const [status] = defineField("status");
const [interviewDateTime] = defineField("interview_date_time");
const [expectedOnboardDate] = defineField("expected_onboard_date");
const [note] = defineField("note");

onMounted(async () => {
  const pathArr = route.path.split("/");
  if (Number(pathArr[pathArr.length - 1])) {
    await store.getDetailApplication(Number(pathArr[pathArr.length - 1]));
    interviewDateTimeSelected.value = new Date(
      String(application.value.interview_date_time),
    );

    setFieldValue("interview_date_time", application.value.interview_date_time);
    setFieldValue("expected_onboard_date", application.value.onboard_date);
    setFieldValue("note", application.value.note);
    setFieldValue("status", application.value.interview_status);

    statusOptionSelected.value = {
      id: Number(application.value.interview_status),
      name: INTERVIEW_STATUS_NAME[
        application.value.interview_status as keyof typeof INTERVIEW_STATUS_NAME
      ],
    };
  } else {
    router.push("/404");
  }
});

const statusChange = () => {
  status.value = Number(statusOptionSelected.value?.id);
};

const interviewDateTimeChange = () => {
  interviewDateTime.value =
    interviewDateTimeSelected.value?.toLocaleDateString();
};

const expectedOnboardDateChange = () => {
  expectedOnboardDate.value =
    expectedOnboardDateSelected.value?.toLocaleDateString();
};

const onSubmit = handleSubmit(async () => {
  console.log(status.value, interviewDateTime.value);
});
</script>
<template>
  <LayoutsCompanyManageCompanyLayout :screen-name="pageTitle">
    <div class="w-full">
      <form
        @submit.prevent="onSubmit"
        class="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div class="flex justify-between border p-2 rounded-md">
          <span class="span-primary-hover">Position</span>
          <span class="span-primary-hover">{{ application.job_position }}</span>
        </div>
        <div class="flex justify-between border p-2 rounded-md">
          <span class="span-primary-hover">Interview Type</span>
          <span class="span-primary-hover">{{
            INTERVIEW_TYPE[
              application.interview_type as keyof typeof INTERVIEW_TYPE
            ]
          }}</span>
        </div>
        <div></div>
        <Validate label="Status" :error="errors.status" class="w-full">
          <KTADropdown
            v-model="statusOptionSelected"
            :options="INTERVIEW_STATUS_OPTIONS"
            option-label="name"
            class="w-full"
            @change="statusChange"
          />
        </Validate>
        <Validate
          v-if="Number(statusOptionSelected?.id) >= INTERVIEW_DATE_SET"
          label="Interview Date"
          :error="errors.interview_date_time"
          class="w-full"
        >
          <KTACalendar
            v-model="interviewDateTimeSelected"
            class="w-full"
            date-format="yy-mm-dd"
            :disabled="Number(statusOptionSelected?.id) > INTERVIEW_DATE_SET"
            @change="interviewDateTimeChange"
          />
        </Validate>
        <div class="flex items-center pt-2">
          <CommonKTAButton label="Save" type="submit" />
        </div>
        <Validate
          :error="errors.expected_onboard_date"
          label="Expected onboard date"
        >
          <KTACalendar
            v-model="expectedOnboardDateSelected"
            class="w-full"
            date-format="yy-mm-dd"
            :disabled="Number(statusOptionSelected?.id) < ONBOARD_DATE_SET"
            @change="expectedOnboardDateChange"
          />
        </Validate>
        <Validate
          :error="errors.expected_onboard_date"
          label="Expected onboard date"
        >
          <KTATextArea
            v-model="note"
            class="w-full"
            date-format="yy-mm-dd"
            :disabled="Number(statusOptionSelected?.id) < ONBOARD_DATE_SET"
            @change="interviewDateTimeChange"
          />
        </Validate>
      </form>
    </div>
    <div class="flex border rounded-md p-2 w-2/3 justify-between">
      <label for="resume" class="text-md">RESUME</label>
      <a
        :href="application.resume"
        target="_blank"
        class="flex gap-2 text-baseline items-center"
        ><span class="pi pi-download"></span>{{ application.resume_name }}</a
      >
    </div>
    <label for="title" class="text-xl py-2">Applicant Info</label>
    <div v-if="application.avatar" class="flex justify-center w-full py-2">
      <img
        :src="application.avatar"
        alt=""
        class="w-[150px] h-[150px] rounded-full"
      />
    </div>
    <div class="flex flex-col gap-y-2">
      <span class="text-2xl text-center">{{
        `${application.first_name} ${application.last_name}, ${application.job_title}`
      }}</span>
      <span class="text-center">{{
        `${application.address} | ${application.phone} | ${application.email}`
      }}</span>
      <hr class="border-[1px] rounded-md border-[#000000]" />
      <div class="flex flex-col md:flex-row gap-2">
        <label
          for="introduce"
          class="text-xl w-full md:w-1/4 span-primary-hover"
          >Profile</label
        >
        <div class="flex flex-col gap-2">
          <div class="flex items-baseline gap-2">
            <span class="pi pi-calendar"></span>
            <span>Date of birth:</span>
            <span>{{ application.date_of_birth }}</span>
          </div>
          <div class="flex items-baseline gap-2">
            <span class="pi pi-map-marker"></span>
            <span>Detail Address:</span>
            <span>{{ application.detail_address }}</span>
          </div>
          <div class="flex items-baseline gap-2">
            <span class="pi pi-user"></span>
            <span>Gender:</span>
            <span>{{ GENDER[application.gender as keyof typeof GENDER] }}</span>
          </div>
          <div class="flex items-baseline gap-2">
            <span class="pi pi-users"></span>
            <span>Married:</span>
            <span>{{ application.is_married ? "Yes" : "No" }}</span>
          </div>
        </div>
      </div>
      <div v-if="application.life_goal">
        <hr class="border-[1px] rounded-md border-[#000000]" />
        <div class="flex gap-2 flex-col md:flex-row">
          <label for="introduce" class="text-xl md:w-1/4 span-primary-hover"
            >Life goal</label
          >
          <div
            class="whitespace-pre-wrap text-justify flex-1"
            v-html="escapeString(application.life_goal ?? '')"
          />
        </div>
      </div>
      <div v-if="application.self_introduce">
        <hr class="border-[1px] rounded-md border-[#000000]" />
        <div class="flex gap-2 flex-col md:flex-row">
          <label for="introduce" class="text-xl md:w-1/4 span-primary-hover"
            >Introduce</label
          >
          <div
            class="whitespace-pre-wrap text-justify flex-1"
            v-html="escapeString(application.self_introduce ?? '')"
          />
        </div>
      </div>

      <hr class="border-[1px] rounded-md border-[#000000]" />
    </div>

    <div class="flex md:w-1/2 justify-between"></div>
  </LayoutsCompanyManageCompanyLayout>
</template>
