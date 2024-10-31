<script lang="ts" setup>
import { isEmpty } from "lodash-es";
import * as Pagination from "~/constants/pagination";
import JobList from "~/components/user/JobList.vue";
import { jobStore } from "~/stores/user/job";
import { useForm } from "vee-validate";
import { userJobSearchSchema } from "~/schemas/user/job.schema";
import KTAInputNumber from "~/components/common/KTAInputNumber.vue";
import KTALoading from "~/components/common/KTALoading.vue";
import Validate from "~/components/common/Validate.vue";
import {
  ORDER_BY_TYPE_OPTIONS,
  TYPE_OF_EMPLOYEE_OPTIONS,
} from "~/constants/job";
import {
  DIRECTION_TYPE_OPTIONS,
  LIMIT_OBJECT_OPTIONS,
} from "~/constants/common";
import type { OptionSelect } from "~/entities/common";
import type { PositionEntity } from "~/entities/user/job";
import { isValid } from "zod";

useHead({ title: "Job finding" });

definePageMeta({
  layout: "user",
});
const store = jobStore();
const jobs = computed(() => store.jobs);
const isLoading = computed(() => store.isLoading);
const isSucceed = computed(() => store.isSucceed);
const positions = computed(() => store.positions);

/**
 * Searching param
 */
const isUseAI = ref<boolean>(true);
interface SearchParam {
  prompt?: string;
  limit?: string;
  page?: string;
  position_id?: string;
  direction?: string;
  is_use_ai?: boolean;
  salary_from?: number;
  salary_up_to?: number;
}

const param = ref<SearchParam>({
  page: "1",
  limit: Pagination.PAGE_LIMIT_DEFAULT,
  is_use_ai: true,
});

const { errors, defineField, handleSubmit, resetForm } = useForm({
  validationSchema: userJobSearchSchema,
});

const [salaryFrom] = defineField("salary_from");
const [salaryUpto] = defineField("salary_upto");

const typeOfEmployeeSelected = ref<OptionSelect>(TYPE_OF_EMPLOYEE_OPTIONS[0]);

const directionSortSelected = ref<{ id: string; name: string }>(
  DIRECTION_TYPE_OPTIONS[0],
);

const orderBySelected = ref<{ id: string; name: string }>(
  ORDER_BY_TYPE_OPTIONS[0],
);

const limitSelected = ref<OptionSelect>(LIMIT_OBJECT_OPTIONS[0]);

const positionSelected = ref<PositionEntity>();

const setQueryParams = () => {
  console.log(param.value.is_use_ai);

  if (param.value.is_use_ai) {
    param.value.is_use_ai = true;
    param.value.limit = "30";
    param.value.page = "1";
  } else {
    param.value.is_use_ai = false;
    param.value.position_id = String(
      positionSelected.value?.id ?? positions.value[0].id,
    );
    param.value.limit = limitSelected.value.name;
    param.value.page = "1";
    param.value.direction = directionSortSelected.value.id;

    if (salaryFrom.value) {
      param.value.salary_from = salaryFrom.value;
    }
    if (salaryUpto.value) {
      param.value.salary_up_to = salaryUpto.value;
    }
  }
};
/**
 * Hook
 * */
onMounted(async () => {
  setQueryParams();
  await store.getPositionNameList({ limit: 100 });

  positionSelected.value = positions.value[0];
});

const search = async () => {
  setQueryParams();
  console.log(param.value);
  if (param.value.is_use_ai && isEmpty(param.value.prompt)) {
    return;
  }

  await store.searchJob(param.value);
};

const changeSearchAdvance = () => {
  param.value.is_use_ai = isUseAI.value;

  if (param.value.is_use_ai) {
    resetForm();

    typeOfEmployeeSelected.value = TYPE_OF_EMPLOYEE_OPTIONS[0];

    directionSortSelected.value = DIRECTION_TYPE_OPTIONS[0];

    orderBySelected.value = ORDER_BY_TYPE_OPTIONS[0];

    limitSelected.value = LIMIT_OBJECT_OPTIONS[0];
  }
};

const onSubmit = handleSubmit(async () => {
  console.log("onSubmit");
});
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="relative">
      <div class="flex flex-col gap-2 w-full justify-center bottom-[30%]">
        <label class="text-2xl font-bold text-left w-full" for="search-input"
          >Search you job</label
        >
        <div class="flex gap-2">
          <CommonKTASearchInput v-model="param.prompt" />
          <Button
            type="button"
            label="Search"
            class="custom-button min-w-[100px] text-center common-rounded"
            @click="search"
            @keydown.ctrl.enter="search"
          />
        </div>
        <Accordion :active-index="1" class="w-full rounded-xl">
          <AccordionTab class="rounded-xl">
            <template #header>Advanced search</template>
            <template #default>
              <div class="flex gap-2 p-2">
                <!-- <Checkbox
                  v-model="isUseAI"
                  :binary="true"
                  @change="changeSearchAdvance"
                /> -->
                <ToggleButton
                  v-model="isUseAI"
                  onLabel="On"
                  offLabel="Off"
                  @change="changeSearchAdvance"
                />
                <div class="flex items-center gap-2">
                  <span>Use AI</span>
                  <span
                    class="pi pi-question-circle"
                    v-tooltip="
                      'We use semantic search and AI to understand you and find the nearest result for you'
                    "
                  ></span>
                </div>
              </div>
              <form @submit.prevent="onSubmit" class="w-full">
                <div class="grid grid-cols-3 gap-2">
                  <CommonKTADropdown
                    label="Order by"
                    v-model="orderBySelected"
                    :options="ORDER_BY_TYPE_OPTIONS"
                    option-label="name"
                    class="w-full"
                    :disabled="param.is_use_ai"
                  />
                  <CommonKTADropdown
                    label="Direction"
                    v-model="directionSortSelected"
                    :options="DIRECTION_TYPE_OPTIONS"
                    option-label="name"
                    class="w-full"
                    :disabled="param.is_use_ai"
                  />
                  <CommonKTADropdown
                    label="Limit result"
                    v-model="limitSelected"
                    :options="LIMIT_OBJECT_OPTIONS"
                    option-label="name"
                    class="w-full"
                    :disabled="param.is_use_ai"
                  />
                  <CommonKTADropdown
                    label="Position"
                    v-model="positionSelected"
                    :options="positions"
                    option-label="name"
                    filters
                    class="w-full"
                    :disabled="param.is_use_ai"
                  />
                  <div class="flex flex-col">
                    <div class="flex gap-2 items-start">
                      <Validate
                        label="Salary from"
                        class="flex-grow-0"
                        :error="errors.salary_from"
                      >
                        <KTAInputNumber
                          class="w-full"
                          v-model="salaryFrom"
                          :disabled="param.is_use_ai"
                        />
                      </Validate>
                      <span class="text-center text-xl pt-8">~</span>
                      <Validate
                        label="Salary upto"
                        class="flex-grow-[1]"
                        :error="errors.salary_upto"
                      >
                        <KTAInputNumber
                          class="w-full"
                          v-model="salaryUpto"
                          :disabled="param.is_use_ai"
                        />
                      </Validate>
                    </div>
                  </div>

                  <CommonKTADropdown
                    label="Type of employee"
                    v-model="typeOfEmployeeSelected"
                    :options="TYPE_OF_EMPLOYEE_OPTIONS"
                    option-label="name"
                    class="w-full"
                    :disabled="param.is_use_ai"
                  />
                </div>
              </form>
            </template>
          </AccordionTab>
        </Accordion>
      </div>
    </div>
    <div>
      <KTALoading v-if="isLoading" />
      <JobList v-else :jobs="jobs" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
:deep(.p-checkbox.p-component:not(.p-highlight)) {
  .p-checkbox-box {
    background-color: #c3d3eb;
  }
}
</style>
