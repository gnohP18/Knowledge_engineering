<script setup lang="ts">
import { get, isEmpty } from "lodash-es";
import KTADataTable from "~/components/common/KTADataTable.vue";
import { APPLICATION_INTERVIEW, COMPANY_INTERVIEW } from "~/constants/route";
import { InterviewStore } from "~/stores/company/interview";
import * as Pagination from "~/constants/pagination";
import type { BasicInterviewEntity } from "~/entities/company/interview";
import { JOB_STATUS } from "~/constants/job";

const pageTitle = "List interview";
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
const interviews = computed(() => store.interviews);
const meta = computed(() => store.meta);
const keyword = ref("");
const statusAll = -1;
const statusFilter = ref(statusAll);
const selectedRows = ref<BasicInterviewEntity[]>([]);
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

onMounted(async () => {
  setQueryParams();
  await store.getList(queryParams);
});

const onRowClick = (event: { originalEvent: any; data: { id: number } }) => {
  if (
    event.originalEvent.target.type === "checkbox" ||
    event.originalEvent.target.closest(".p-checkbox-icon")
  ) {
    event.originalEvent.stopPropagation();
  } else {
    router.push({
      path: `${COMPANY_INTERVIEW}/${event.data.id}${APPLICATION_INTERVIEW}`,
    });
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
  <LayoutsCompanyManageCompanyLayout :screen-name="pageTitle">
    <KTADataTable
      v-model:selection="selectedRows"
      :is-empty="isEmpty(interviews)"
      data-key="id"
      :value="interviews"
      :meta="meta"
      :query-params="queryParams"
      :loading="isLoading"
      class="cursor-pointer"
      :lazy="true"
      has-paginator
      @sort="onSort"
      @row-click="onRowClick"
    >
      <Column field="id" header="ID" />
      <Column field="name" header="Name" />
      <Column field="position_name" header="Position name" />
      <Column field="number_of_position" header="Number of position" />
      <Column field="vacancy" header="Vacancy" />
      <Column field="number_of_application" header="Number of application" />
      <Column field="status" header="Status">
        <template #body="{ data }">
          <div class="flex justify-start w-full">
            {{ JOB_STATUS[data.status] }}
          </div>
        </template>
      </Column>
      <Column field="updated_at" header="Updated at" />
    </KTADataTable>
  </LayoutsCompanyManageCompanyLayout>
</template>
