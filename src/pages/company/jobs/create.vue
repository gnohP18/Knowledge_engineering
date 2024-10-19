<script setup lang="ts">
import { useForm } from "vee-validate";
import { companyJobSchema } from "~/schemas/company/job.schema";
import { JobStore } from "~/stores/company/job";
import Validate from "~/components/common/Validate.vue";
import {
  INTERVIEW_TYPE_OPTIONS,
  JOB_STATUS_OPTIONS,
  TYPE_OF_EMPLOYEE_OPTIONS,
} from "~/constants/job";
import type { OptionSelect } from "~/entities/common";
import KTAInputNumber from "~/components/common/KTAInputNumber.vue";

useHead({ title: "List job" });

definePageMeta({ layout: "company" });

const route = useRoute();

const store = JobStore();
const isLoading = computed(() => store.isLoading);
const isSucceed = computed(() => store.isSucceed);

const positionNameOptions = computed(() => store.positionNames);
const positionNameSelected = ref<OptionSelect>({ id: "0", name: "Default" });

const statusOptionSelected = ref<OptionSelect>(JOB_STATUS_OPTIONS[0]);

const typeOfEmployeeSelected = ref<OptionSelect>(TYPE_OF_EMPLOYEE_OPTIONS[0]);

const typeOfInterviewSelected = ref<OptionSelect>(INTERVIEW_TYPE_OPTIONS[1]);

const closeDateSelected = ref<string>();
const minDate = ref();

const test = ref([{}]);

const { handleSubmit, errors, defineField } = useForm({
  validationSchema: companyJobSchema,
});

onMounted(async () => {
  await store.getIndexCreate();
  initFormData();
});

const initFormData = () => {
  if (positionNameOptions.value.length > 0) {
    positionNameSelected.value = positionNameOptions.value[0];
  }
  const [date, month, year] = [
    new Date().getDate(),
    new Date().getMonth(),
    new Date().getFullYear(),
  ];
  closeDateSelected.value = `${year}-${month > 10 ? "" : "0"}${month}-${date > 10 ? "" : "0"}${date}`;

  let yesterday = new Date();
  minDate.value = yesterday.setDate(yesterday.getDate() - 1);
};

const [title] = defineField("title");
const [description] = defineField("description");
const [positionName] = defineField("position_name");
const [numberOfPosition] = defineField("number_of_position");
const [typeOfEmployee] = defineField("type_of_employee");
const [typeOfInterview] = defineField("type_of_interview");
const [closeDate] = defineField("close_date");
const [address] = defineField("address");
const [mediaFileId] = defineField("media_file_id");
const [interviewDatetimeId] = defineField("interview_date_time_id");
const [status] = defineField("status");
const [salaryFrom] = defineField("salary_from");
const [salaryUpto] = defineField("salary_upto");

const changePositionName = () => {
  positionName.value = Number(positionNameSelected.value?.id) ?? 0;
};

const changeStatus = () => {
  status.value = Number(statusOptionSelected.value.id);
};

const changeTypeOfEmployee = () => {
  typeOfEmployee.value = Number(typeOfEmployeeSelected.value.id);
};

const changeTypeOfInterview = () => {
  typeOfInterview.value = Number(typeOfInterviewSelected.value.id);
};

const changeCloseDate = () => {
  closeDate.value = closeDateSelected.value;
};

/**
 * Submit handle
 */
const onSubmit = handleSubmit(async (value) => {});
</script>

<template>
  <LayoutsCompanyManageCompanyLayout
    :is-loading="isLoading"
    :is-succeed="isSucceed"
    :screen-name="'Create job'"
  >
    <form @submit="onSubmit" class="flex flex-col gap-2">
      <div class="w-full grid gap-2 grid-cols-2">
        <Validate label="Title" :error="errors.title" required>
          <CommonKTAInput v-model="title" class="w-full" />
        </Validate>

        <Validate label="Status" :error="errors.status">
          <CommonKTADropdown
            v-model="statusOptionSelected"
            :options="JOB_STATUS_OPTIONS"
            option-label="name"
            select-on-focus
            class="w-full"
            @change="changeStatus"
          />
        </Validate>
      </div>

      <Validate
        label="Description"
        class="w-full"
        :error="errors.description"
        required
      >
        <CommonKTATextArea v-model="description" class="w-full min-h-[150px]" />
      </Validate>

      <div class="w-full grid gap-2 grid-cols-2">
        <Validate
          v-if="positionNameOptions"
          label="Position name"
          class="w-full"
          :error="errors.position_name"
        >
          <CommonKTADropdown
            v-model="positionNameSelected"
            :options="positionNameOptions"
            filter
            option-label="name"
            select-on-focus
            class="w-full"
            @change="changePositionName"
          />
        </Validate>
        <Validate
          label="Type of employee"
          class="w-full"
          :error="errors.type_of_employee"
        >
          <CommonKTADropdown
            v-model="typeOfEmployeeSelected"
            :options="TYPE_OF_EMPLOYEE_OPTIONS"
            filter
            option-label="name"
            select-on-focus
            class="w-full"
            @change="changeTypeOfEmployee"
          />
        </Validate>
      </div>

      <div class="w-full grid gap-2 grid-cols-2">
        <Validate
          label="Type of interview"
          class="w-full"
          :error="errors.type_of_employee"
        >
          <CommonKTADropdown
            v-model="typeOfInterviewSelected"
            :options="INTERVIEW_TYPE_OPTIONS"
            filter
            option-label="name"
            select-on-focus
            class="w-full"
            @change="changeTypeOfInterview"
          />
        </Validate>

        <Validate
          label="Number of position"
          :error="errors.number_of_position"
          required
        >
          <KTAInputNumber
            v-model="numberOfPosition"
            class="w-full"
            showButtons
            :min="0"
            :max="100"
          />
        </Validate>
      </div>

      <label class="text-sm span-primary-hover" for="salary"
        >Salary range</label
      >
      <div class="w-full flex gap-2">
        <div class="flex gap-2">
          <Validate class="w-1/3" :error="errors.salary_from">
            <KTAInputNumber v-model="salaryFrom" class="w-full" />
          </Validate>
          <span class="text-center text-xl pt-2">~</span>
          <Validate class="w-1/3" :error="errors.salary_upto">
            <KTAInputNumber v-model="salaryUpto" class="w-full" />
          </Validate>

          <label
            for="salary"
            class="break-keep w-[200px] text-center pt-2 span-primary-hover"
            >Preview salary</label
          >
          <div class="flex pt-2 gap-2">
            <span class="min-w-[80px]">{{
              salaryFrom ? `$${salaryFrom}` : ""
            }}</span>
            ~
            <span class="min-w-[80px]">{{
              salaryUpto ? `$${salaryUpto}` : ""
            }}</span>
          </div>
        </div>
      </div>

      <div class="w-full grid gap-2 grid-cols-2">
        <Validate label="Address" :error="errors.address" required>
          <CommonKTAInput v-model="address" class="w-full" />
        </Validate>
        <Validate label="Close date" :error="errors.close_date">
          <CommonKTACalendar
            v-model="closeDateSelected"
            :min-date="minDate"
            class="w-full"
            showIcon
            date-format="yy-mm-dd"
            @change="changeCloseDate"
          />
        </Validate>
      </div>
      <div class="flex">
        <div></div>
      </div>
      <CommonKTAButton label="Create" type="submit" />
    </form>
  </LayoutsCompanyManageCompanyLayout>
</template>
