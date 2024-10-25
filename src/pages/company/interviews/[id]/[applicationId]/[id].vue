<script setup lang="ts">
import { useForm } from "vee-validate";
import KTADropdown from "~/components/common/KTADropdown.vue";
import Validate from "~/components/common/Validate.vue";
import {
  INTERVIEW_DATE_SET,
  INTERVIEW_STATUS_NAME,
} from "~/constants/application";
import { MODE_COMPANY_VIEW } from "~/constants/common";
import { INTERVIEW_STATUS_OPTIONS } from "~/constants/application";
import type { OptionSelect } from "~/entities/common";
import type { ApplicationEntity } from "~/entities/user/application";
import { changeStatusSchema } from "~/schemas/company/interview.schema";
import { InterviewStore } from "~/stores/company/interview";
import KTACalendar from "~/components/common/KTACalendar.vue";

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

const { setFieldValue, handleSubmit, errors, defineField } = useForm({
  validationSchema: changeStatusSchema,
});
const [status] = defineField("status");
const [interviewDateTime] = defineField("interview_date_time");

onMounted(async () => {
  const pathArr = route.path.split("/");
  if (Number(pathArr[pathArr.length - 1])) {
    await store.getDetailApplication(Number(pathArr[pathArr.length - 1]));
    interviewDateTimeSelected.value = new Date(
      String(application.value.interview_date_time),
    );

    setFieldValue("interview_date_time", application.value.interview_date_time);
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

const onSubmit = handleSubmit(async () => {
  console.log(status.value, interviewDateTime.value);
});

watch(errors, () => {
  console.log(errors.value);
});
</script>
<template>
  <LayoutsCompanyManageCompanyLayout :screen-name="pageTitle">
    <div class="w-full">
      <form @submit.prevent="onSubmit" class="grid grid-cols-3 gap-4">
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
      </form>
    </div>
    <UserApplicationCard
      v-if="application"
      :application="application as ApplicationEntity"
      :mode="MODE_COMPANY_VIEW"
    />
  </LayoutsCompanyManageCompanyLayout>
</template>
