<script lang="ts" setup>
import { isEmpty } from "lodash-es";
import * as Pagination from "~/constants/pagination";
import JobList from "~/components/user/JobList.vue";
import { jobStore } from "~/stores/user/job";
import { useForm } from "vee-validate";
import { userJobSearchSchema } from "~/schemas/user/job.schema";
import KTAInputNumber from "~/components/common/KTAInputNumber.vue";
import KTASearchInput from "~/components/common/KTASearchInput.vue";
import KTALoading from "~/components/common/KTALoading.vue";
import KTAImageBlock from "~/components/common/KTAImageBlock.vue";
import Validate from "~/components/common/Validate.vue";
import {
  ORDER_BY_TYPE_OPTIONS,
  TYPE_OF_EMPLOYEE_OPTIONS,
} from "~/constants/job";
import {
  DIRECTION_TYPE_OPTIONS,
  LIMIT_OBJECT_OPTIONS,
  OPTION_ALL,
} from "~/constants/common";
import type { OptionSelect } from "~/entities/common";
import type { PositionEntity } from "~/entities/user/job";
import EmptyData from "~/components/common/EmptyData.vue";
import { USER_TROUBLESHOOTING } from "~/constants/route";

useHead({ title: "Job finding" });

definePageMeta({
  layout: "user",
});

const store = jobStore();
const jobs = computed(() => store.jobs);
const meta = computed(() => store.meta);
const isLoading = computed(() => store.isLoading);
const isSucceed = computed(() => store.isSucceed);
const firstTimeLoad = ref<boolean>(true);
const positions = computed(() => [...[OPTION_ALL], ...store.positions]);
/**
 * Searching param
 */
const isUseAI = ref<boolean>(true);
interface SearchParam {
  SearchText?: string;
  Limit?: string;
  Page?: string;
  TypeOfEmployee?: number;
  PositionId?: string;
  Direction?: string;
  IsUseAi?: boolean;
  SalaryFrom?: number;
  SalaryUpTo?: number;
}

const param = ref<SearchParam>({
  Page: "1",
  Limit: Pagination.PAGE_LIMIT_DEFAULT,
  IsUseAi: true,
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
  if (param.value.IsUseAi) {
    param.value.IsUseAi = true;
    param.value.Limit = Pagination.PAGE_LIMIT_DEFAULT;
    param.value.Page = "1";
  } else {
    param.value.IsUseAi = false;
    if (positionSelected.value?.id !== OPTION_ALL.id) {
      param.value.PositionId = String(
        positionSelected.value?.id ?? positions.value[0].id,
      );
    } else {
      delete param.value.PositionId;
    }

    if (typeOfEmployeeSelected.value.id !== OPTION_ALL.id) {
      param.value.TypeOfEmployee = typeOfEmployeeSelected.value.id;
    } else {
      delete param.value.TypeOfEmployee;
    }

    param.value.Limit = limitSelected.value.name;
    param.value.Page = "1";
    param.value.Direction = directionSortSelected.value.id;

    if (salaryFrom.value) {
      param.value.SalaryFrom = salaryFrom.value;
    } else {
      delete param.value.SalaryFrom;
    }
    if (salaryUpto.value) {
      param.value.SalaryUpTo = salaryUpto.value;
    } else {
      delete param.value.SalaryUpTo;
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
  firstTimeLoad.value = false;
  setQueryParams();

  if (param.value.IsUseAi && isEmpty(param.value.SearchText)) {
    return;
  }
  if (!isLoading.value) {
    await store.searchJob(param.value);
  }
};

const changeSearchAdvance = () => {
  param.value.IsUseAi = isUseAI.value;

  if (param.value.IsUseAi) {
    resetForm();

    typeOfEmployeeSelected.value = TYPE_OF_EMPLOYEE_OPTIONS[0];

    directionSortSelected.value = DIRECTION_TYPE_OPTIONS[0];

    orderBySelected.value = ORDER_BY_TYPE_OPTIONS[0];

    limitSelected.value = LIMIT_OBJECT_OPTIONS[0];
  }
};

const checkEmptySearchText = () => {
  if (isEmpty(param.value.SearchText)) {
    firstTimeLoad.value = true;
  }
};

const onSubmit = handleSubmit(async () => {
  console.log("onSubmit");
});

const changePaginator = async (value: any) => {
  if (param.value.IsUseAi) {
    param.value.IsUseAi = true;
    param.value.Limit = value.Limit;
    param.value.Page = value.Page;
  } else {
    param.value.IsUseAi = false;
    if (positionSelected.value?.id !== OPTION_ALL.id) {
      param.value.PositionId = String(
        positionSelected.value?.id ?? positions.value[0].id,
      );
    } else {
      delete param.value.PositionId;
    }
    param.value.Limit = limitSelected.value.name;
    param.value.Page = value.Page;
    param.value.Direction = directionSortSelected.value.id;

    if (typeOfEmployeeSelected.value.id !== OPTION_ALL.id) {
      param.value.TypeOfEmployee = typeOfEmployeeSelected.value.id;
    } else {
      delete param.value.TypeOfEmployee;
    }

    if (salaryFrom.value) {
      param.value.SalaryFrom = salaryFrom.value;
    } else {
      delete param.value.SalaryFrom;
    }
    if (salaryUpto.value) {
      param.value.SalaryUpTo = salaryUpto.value;
    } else {
      delete param.value.SalaryUpTo;
    }
  }

  if (param.value.IsUseAi && isEmpty(param.value.SearchText)) {
    return;
  }
  if (!isLoading.value) {
    await store.searchJob(param.value);
  }
};
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="relative">
      <div class="flex flex-col gap-2 w-full justify-center bottom-[30%]">
        <label class="text-2xl font-bold text-left w-full" for="search-input"
          >Search you job</label
        >
        <div class="flex flex-col md:flex-row gap-2">
          <KTASearchInput
            v-model="param.SearchText"
            name="search_text"
            autocomplete="on"
            @keydown.enter.prevent="search"
            @input="checkEmptySearchText"
          />
          <Button
            type="button"
            label="Search"
            class="custom-button min-w-[100px] text-center common-rounded"
            @click="search"
          />
        </div>
        <Accordion :active-index="1" class="w-full rounded-xl">
          <AccordionTab class="rounded-xl">
            <template #header>Advanced search</template>
            <template #default>
              <div class="flex gap-2 p-2">
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
                <div class="md:grid md:grid-cols-3 gap-2">
                  <CommonKTADropdown
                    label="Order by"
                    v-model="orderBySelected"
                    :options="ORDER_BY_TYPE_OPTIONS"
                    option-label="name"
                    class="w-full"
                    :disabled="param.IsUseAi"
                  />
                  <CommonKTADropdown
                    label="Direction"
                    v-model="directionSortSelected"
                    :options="DIRECTION_TYPE_OPTIONS"
                    option-label="name"
                    class="w-full"
                    :disabled="param.IsUseAi"
                  />
                  <CommonKTADropdown
                    label="Limit result"
                    v-model="limitSelected"
                    :options="LIMIT_OBJECT_OPTIONS"
                    option-label="name"
                    class="w-full"
                    :disabled="param.IsUseAi"
                  />
                  <CommonKTADropdown
                    label="Position"
                    v-model="positionSelected"
                    :options="positions"
                    option-label="name"
                    filters
                    class="w-full"
                    :disabled="param.IsUseAi"
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
                          :disabled="param.IsUseAi"
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
                          :disabled="param.IsUseAi"
                        />
                      </Validate>
                    </div>
                  </div>

                  <CommonKTADropdown
                    label="Type of employee"
                    v-model="typeOfEmployeeSelected"
                    :options="[...[OPTION_ALL], ...TYPE_OF_EMPLOYEE_OPTIONS]"
                    option-label="name"
                    class="w-full"
                    :disabled="param.IsUseAi"
                  />
                </div>
                <div v-if="positions.length === 1">
                  <small
                    >If the Position dropdown has only one option please go to
                    the troubleshooting page
                  </small>
                  <a class="text-xs" :href="USER_TROUBLESHOOTING">Click here</a>
                </div>
              </form>
            </template>
          </AccordionTab>
        </Accordion>
      </div>
    </div>
    <div v-if="!firstTimeLoad">
      <KTALoading v-if="isLoading" />
      <div class="flex" v-else>
        <JobList
          v-if="jobs.length > 0"
          :jobs="jobs"
          :meta="meta"
          @change-paginator="changePaginator"
        />
        <EmptyData class="flex-1" v-else />
      </div>
    </div>
    <KTAImageBlock v-else />
  </div>
</template>
<style lang="scss" scoped>
:deep(.p-checkbox.p-component:not(.p-highlight)) {
  .p-checkbox-box {
    background-color: #c3d3eb;
  }
}
</style>
