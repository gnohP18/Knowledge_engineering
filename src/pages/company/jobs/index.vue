<script lang="ts" setup>
import { get, isEmpty } from "lodash-es";
import KTADataTable from "~/components/common/KTADataTable.vue";
import { JOB_STATUS } from "~/constants/job";

import * as Pagination from "~/constants/pagination";
import { COMPANY_JOB } from "~/constants/route";
import type { BasicJobEntity } from "~/entities/company/job";
import { JobStore } from "~/stores/company/job";

const route = useRoute();
const router = useRouter();

const store = JobStore();
const pageTitle = "List of jobs";
const isLoading = computed(() => store.isLoading);
const isSucceed = computed(() => store.isSucceed);
const jobs = computed(() => store.jobs);
const meta = computed(() => store.meta);
const keyword = ref("");
const statusAll = -1;
const statusFilter = ref(statusAll);

const selectedRows = ref<BasicJobEntity[]>([]);

useHead({ title: pageTitle });
definePageMeta({
  layout: "company",
  middleware: "auth-company",
});

interface QueryParamsEntity {
  page?: string;
  limit?: string;
  status?: string;
  keyword?: string;
}

let queryParams = reactive<QueryParamsEntity>({
  page: "1",
  limit: String(Pagination.PAGE_LIMIT_DEFAULT),
});

const setQueryParams = () => {
  if (route.query.keyword) {
    queryParams = Object.assign(queryParams, { keyword: route.query.keyword });
  }

  if (route.query.status) {
    queryParams = Object.assign(queryParams, { status: route.query.status });
  }

  queryParams.page = String(get(route, "query.page", "1"));

  if (route.query.limit) {
    queryParams.limit = String(route.query.limit);
  }
};

watch(
  () => route.query,
  () => {
    setQueryParams();
    store.getList(queryParams);
  },
);

onBeforeMount(() => {
  store.resetState();
});

onMounted(async () => {
  setQueryParams();
  await store.getList(queryParams);
});

const searchKeyword = (event: any) => {
  setTimeout(() => {
    if (!store.$state.isLoading) {
      queryParams.page = "1";
      Object.assign(queryParams, { keyword });
      store.getList(queryParams);
    }
  }, 300);
};

const handleResetInput = () => {
  keyword.value = "";
};

const filterStatus = async () => {
  queryParams.page = "1";
  statusFilter.value !== statusAll
    ? Object.assign(queryParams, { status: statusFilter.value })
    : delete queryParams.status;

  await store.getList(queryParams);
};

const onRowClick = (event: { originalEvent: any; data: { id: number } }) => {
  if (
    event.originalEvent.target.type === "checkbox" ||
    event.originalEvent.target.closest(".p-checkbox-icon")
  ) {
    event.originalEvent.stopPropagation();
  } else {
    router.push({ path: `${COMPANY_JOB}/${event.data.id}` });
  }
};

const onSort = (event: { sortField: string; sortOrder: number }) => {
  // 1 for asc, -1 for desc)
  const field = `s_${event.sortField}`;
  const order = event.sortOrder === 1 ? "asc" : "desc";

  const filtered = ["status", "keyword", "limit"];
  if (!store.$state.isLoading) {
    for (const key in queryParams) {
      if (!filtered.includes(key)) {
        delete queryParams[key as keyof QueryParamsEntity];
      }
    }

    queryParams.page = "1";
    const query = Object.assign(queryParams, { [field]: order });
    navigateTo({ path: route.path, query });
  }
};
</script>

<template>
  <LayoutsCompanyManageCompanyLayout
    :is-loading="isLoading"
    :is-succeed="isSucceed"
    :screen-name="pageTitle"
  >
    <KTADataTable
      v-model:selection="selectedRows"
      :is-empty="isEmpty(jobs)"
      data-key="id"
      :value="jobs"
      :meta="meta"
      :query-params="queryParams"
      :loading="store.isLoading"
      class="cursor-pointer"
      :lazy="true"
      has-paginator
      @sort="onSort"
      @row-click="onRowClick"
    >
      <Column field="id" header="ID" />
      <Column field="title" header="Title" />
      <Column field="position_name" header="Position name" />
      <Column field="number_of_position" header="Number of position" />
      <Column field="status" header="Status">
        <template #body="{ data }">
          <div class="flex justify-start w-full">
            {{ JOB_STATUS[data.status] }}
          </div>
        </template>
      </Column>
      <Column field="close_day" header="Close at">
        <template #body="{ data }">
          <div class="flex justify-start w-full">
            <span class="text-sm">{{
              convertDateTimeServer(data.close_date)
            }}</span>
          </div>
        </template>
      </Column>
    </KTADataTable>
  </LayoutsCompanyManageCompanyLayout>
</template>

<style lang="scss" scoped>
:deep(.p-datatable .p-datatable-thead > tr > th) {
  white-space: nowrap;
}
:deep(.p-datatable .p-datatable-tbody > tr > td) {
  padding: 1rem !important;
}
</style>
