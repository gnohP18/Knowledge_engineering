<script lang="ts" setup>
import * as Pagination from "~/constants/pagination";
import JobList from "~/components/user/JobList.vue";
import { jobStore } from "~/stores/user/job";

useHead({ title: "Job finding" });

definePageMeta({
  layout: "user",
});
const store = jobStore();
const jobs = computed(() => store.jobs);
const isAdvancedSearch = ref<boolean>(true);
const isSortDescCreatedAt = ref<boolean>(true);
const prompt = ref<string>("");
interface SearchParam {
  prompt?: string;
  limit?: string;
  is_advanced_search?: boolean;
  is_sort_desc_date?: boolean;
}

const param = ref<SearchParam>({
  limit: Pagination.PAGE_LIMIT_DEFAULT,
});

const setQueryParams = () => {
  if (prompt.value) {
    param.value = Object.assign({ prompt: prompt.value }, param);
  }

  if (isAdvancedSearch.value) {
    param.value = Object.assign(
      { is_advanced_search: isAdvancedSearch.value },
      param,
    );
  }

  if (isSortDescCreatedAt.value) {
    param.value = Object.assign(
      { is_sort_desc_date: isSortDescCreatedAt.value },
      param,
    );
  }
};

onMounted(() => {
  setQueryParams();
});

const search = async () => {
  if (prompt.value) {
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
        <div class="flex gap-2">
          <CommonKTASearchInput v-model="prompt" @search="search" />
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
              <div class="w-full grid grid-cols-4">
                <div class="flex gap-2 p-2">
                  <Checkbox v-model="isAdvancedSearch" :binary="true" />
                  <div class="flex items-center gap-2">
                    <span>Advanced search (With AI)</span>
                    <span
                      class="pi pi-question-circle"
                      v-tooltip="
                        'We use semantic search and AI to understand you and find the nearest result for you'
                      "
                    ></span>
                  </div>
                </div>
                <div class="flex gap-2 p-2">
                  <Checkbox v-model="isSortDescCreatedAt" :binary="true" />
                  <span>Order by date post (Desc)</span>
                </div>
              </div>
            </template>
          </AccordionTab>
        </Accordion>
      </div>
    </div>
    <div>
      <JobList :jobs="jobs" />
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
