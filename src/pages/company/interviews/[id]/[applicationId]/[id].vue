<script setup lang="ts">
import { get } from "lodash-es";
import { useForm } from "vee-validate";
import KTADropdown from "~/components/common/KTADropdown.vue";
import KTAButton from "~/components/common/KTAButton.vue";
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
const statusOptionSelected = ref<OptionSelect>(INTERVIEW_STATUS_OPTIONS[0]);
const interviewDateTimeSelected = ref<Date>();
const expectedOnboardDateSelected = ref<Date>();
const applicationId = ref<number>();

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
    applicationId.value = Number(pathArr[pathArr.length - 1]);
    await store.getDetailApplication(applicationId.value);
    const interviewDateTime = get(application.value, "interviewDateTime", "");
    if (interviewDateTime) {
      interviewDateTimeSelected.value = new Date(
        convertDateTimeServer(interviewDateTime),
      );
    } else {
      interviewDateTimeSelected.value = new Date();
    }

    const expectedOnboardDate = get(application.value, "onBoardDate", "");
    if (expectedOnboardDate) {
      expectedOnboardDateSelected.value = new Date(expectedOnboardDate);
    }

    setFieldValue("interview_date_time", application.value.interviewDateTime);
    setFieldValue("expected_onboard_date", application.value.onboardDate);
    setFieldValue("note", application.value.note);
    setFieldValue("status", application.value.interviewStatus);

    statusOptionSelected.value =
      INTERVIEW_STATUS_OPTIONS.filter(
        (option) => option.id === application.value.interviewStatus,
      )[0] ?? INTERVIEW_STATUS_OPTIONS[0];
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
  let entity = {
    applicationId: applicationId.value,
    status: statusOptionSelected.value.id,
    note: note.value,
  };

  if (statusOptionSelected.value.id === INTERVIEW_DATE_SET) {
    entity = Object.assign(entity, {
      interviewDateTime: convertDateTimeServer(interviewDateTimeSelected.value),
    });
  }

  if (statusOptionSelected.value.id === ONBOARD_DATE_SET) {
    entity = Object.assign(entity, {
      expectedOnboardDate: convertDateTimeServer(
        expectedOnboardDateSelected.value,
      ),
    });
  }

  await store.changeStatusApplication(entity);
});
</script>
<template>
  <LayoutsCompanyManageCompanyLayout
    :is-loading="isLoading"
    :is-succeed="isSucceed"
    :screen-name="pageTitle"
  >
    <div class="w-full" v-if="!isLoading && application">
      <form
        @submit.prevent="onSubmit"
        class="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div class="flex justify-between border p-2 rounded-md">
          <span class="span-primary-hover">Position</span>
          <span class="span-primary-hover">{{
            application.jobPositionName
          }}</span>
        </div>
        <div class="flex justify-between border p-2 rounded-md">
          <span class="span-primary-hover">Interview Type</span>
          <span class="span-primary-hover">{{
            INTERVIEW_TYPE[
              application.interviewType as keyof typeof INTERVIEW_TYPE
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
        <div>
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
        </div>
        <div></div>
        <Validate
          :error="errors.expected_onboard_date"
          v-if="Number(statusOptionSelected?.id) >= ONBOARD_DATE_SET"
          label="Expected onboard date"
        >
          <KTACalendar
            v-model="expectedOnboardDateSelected"
            class="w-full"
            date-format="yy-mm-dd"
            :disabled="Number(statusOptionSelected?.id) > ONBOARD_DATE_SET"
            @change="expectedOnboardDateChange"
          />
        </Validate>
        <Validate :error="errors.note" label="Note">
          <KTATextArea
            v-model="note"
            class="w-full"
            date-format="yy-mm-dd"
            @change="interviewDateTimeChange"
          />
        </Validate>
        <div class="flex items-center pt-2">
          <KTAButton
            v-tooltip="
              'This feature is not available right now 🙇‍♂️ We will fit it'
            "
            disabled
            label="Save"
            @click="onSubmit"
          />
        </div>
      </form>
    </div>
    <div class="flex border rounded-md my-2 p-2 w-2/3 justify-between">
      <label for="resume" class="text-md">RESUME</label>
      <a
        :href="application.resume?.url"
        target="_blank"
        class="flex gap-2 text-baseline items-center"
        ><span class="pi pi-download"></span>{{ application?.resume?.name }}</a
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
        `${application.firstName} ${application.lastName}, ${application.jobTitle}`
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
            <span>{{ application.dateOfBirth }}</span>
          </div>
          <div class="flex items-baseline gap-2">
            <span class="pi pi-map-marker"></span>
            <span>Detail Address:</span>
            <span>{{ application.detailAddress }}</span>
          </div>
          <div class="flex items-baseline gap-2">
            <span class="pi pi-user"></span>
            <span>Gender:</span>
            <span>{{ GENDER[application.gender as keyof typeof GENDER] }}</span>
          </div>
          <div class="flex items-baseline gap-2">
            <span class="pi pi-users"></span>
            <span>Married:</span>
            <span>{{ application.isMarried ? "Yes" : "No" }}</span>
          </div>
        </div>
      </div>
      <div v-if="application.lifeGoal">
        <hr class="border-[1px] rounded-md border-[#000000]" />
        <div class="flex gap-2 flex-col md:flex-row">
          <label for="introduce" class="text-xl md:w-1/4 span-primary-hover"
            >Life goal</label
          >
          <div
            class="whitespace-pre-wrap text-justify flex-1"
            v-html="escapeString(application.lifeGoal ?? '')"
          />
        </div>
      </div>
      <div v-if="application.selfIntroduce">
        <hr class="border-[1px] rounded-md border-[#000000]" />
        <div class="flex gap-2 flex-col md:flex-row">
          <label for="introduce" class="text-xl md:w-1/4 span-primary-hover"
            >Introduce</label
          >
          <div
            class="whitespace-pre-wrap text-justify flex-1"
            v-html="escapeString(application.selfIntroduce ?? '')"
          />
        </div>
      </div>

      <hr class="border-[1px] rounded-md border-[#000000]" />
    </div>

    <div class="flex md:w-1/2 justify-between"></div>
  </LayoutsCompanyManageCompanyLayout>
</template>
