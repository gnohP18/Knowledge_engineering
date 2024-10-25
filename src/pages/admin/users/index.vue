<script lang="ts" setup>
import { get, isEmpty } from "lodash-es";
import KTADataTable from "~/components/common/KTADataTable.vue";
import { COMMON_STATUS } from "~/constants/common";
import * as Pagination from "~/constants/pagination";
import { COMPANY_JOB } from "~/constants/route";
import type { BasicUserEntity } from "~/entities/admin/user";
import { UserStore } from "~/stores/admin/user";

const route = useRoute();
const router = useRouter();

const store = UserStore();
const pageTitle = "List of user";
const isLoading = computed(() => store.isLoading);
const isSucceed = computed(() => store.isSucceed);
const users = computed(() => store.users);
const meta = computed(() => store.meta);
const keyword = ref("");
const statusAll = -1;
const statusFilter = ref(statusAll);

const selectedRows = ref<BasicUserEntity[]>([]);

useHead({ title: pageTitle });
definePageMeta({
  layout: "admin",
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
      :is-empty="isEmpty(users)"
      data-key="id"
      :value="users"
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
      <Column field="first_name" header="Title" />
      <Column field="status" header="Status">
        <template #body="{ data }">
          <div class="flex justify-start w-full">
            {{ COMMON_STATUS[data.status] }}
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
