<script lang="ts" setup>
import { COMPANY_SAMPLE } from "~/constants/sample";
import type { CompanyEntity } from "~/entities/user/company";
import * as Pagination from "~/constants/pagination";
import { get, isEmpty } from "lodash-es";
import { companyStore } from "~/stores/user/company";

definePageMeta({
  layout: "company",
});

const store = companyStore();
const meta = computed(() => store.meta);
const companies = computed(() => store.companies);

interface QueryParamsEntity {
  page?: string;
  limit?: string;
  status?: string;
  keyword?: string;
  s_email?: string;
  s_status?: string;
  s_username?: string;
  s_id?: string;
  s_role_name?: string;
  s_name?: string;
  s_phone?: string;
}

const route = useRoute();
const router = useRouter();

let queryParams = reactive<QueryParamsEntity>({
  page: "1",
  limit: String(Pagination.PAGE_LIMIT_DEFAULT),
});

const selectedRows = ref<CompanyEntity[]>([]);

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

const onRowClick = (event: { originalEvent: any; data: { id: number } }) => {
  if (
    event.originalEvent.target.type === "checkbox" ||
    event.originalEvent.target.closest(".p-checkbox-icon")
  ) {
    event.originalEvent.stopPropagation();
  } else {
    router.push({ path: `/admin/admins/${event.data.id}` });
  }
};
</script>
<template>
  <div class="flex flex-col">
    <CommonKTADataTable
      v-model:selection="selectedRows"
      :is-empty="isEmpty(companies)"
      data-key="id"
      :value="companies"
      :meta="meta"
      :query-params="queryParams"
      :loading="store.isLoading"
      class="cursor-pointer"
      :lazy="true"
      has-paginator
      @sort="onSort"
      @row-click="onRowClick"
    />
  </div>
</template>
