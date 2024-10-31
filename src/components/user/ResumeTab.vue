<script lang="ts" setup>
import { get, isEmpty } from "lodash-es";
import type { BasicResumeEntity } from "~/entities/user/resume";
import { userStore } from "~/stores/user/user";
import * as Pagination from "~/constants/pagination";

const store = userStore();

const route = useRoute();
const router = useRouter();

const pageTitle = "List of user";
const isLoading = computed(() => store.isLoading);
const isSucceed = computed(() => store.isSucceed);
const resumes = computed(() => store.resumes);
const meta = computed(() => store.meta);
const keyword = ref("");
const statusAll = -1;
const statusFilter = ref(statusAll);

const selectedRows = ref<BasicResumeEntity[]>([]);

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
    store.getResumeList(queryParams);
  },
);

onBeforeMount(() => {
  store.resetState();
});

onMounted(async () => {
  setQueryParams();
  await store.getResumeList(queryParams);
});

const searchKeyword = (event: any) => {
  setTimeout(() => {
    if (!store.$state.isLoading) {
      queryParams.page = "1";
      Object.assign(queryParams, { keyword });
      store.getResumeList(queryParams);
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

  await store.getResumeList(queryParams);
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
  <KTADataTable
    v-model:selection="selectedRows"
    :is-empty="isEmpty(resumes)"
    data-key="id"
    :value="resumes"
    :meta="meta"
    :query-params="queryParams"
    :loading="store.isLoading"
    class="cursor-pointer"
    :lazy="true"
    has-paginator
    @sort="onSort"
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
</template>
<style lang="scss" scoped>
.menu-item {
  &:hover {
    border-color: #11b9b5;
    border-width: 2px;
  }
}
</style>
