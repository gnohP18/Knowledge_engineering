<script setup lang="ts">
import { get, isEmpty } from "lodash-es";
import KTADataTable from "~/components/common/KTADataTable.vue";
import { INTERVIEW_STATUS_NAME } from "~/constants/application";
import * as Pagination from "~/constants/pagination";
import { COMPANY_INTERVIEW, APPLICATION_INTERVIEW } from "~/constants/route";

import type { BasicApplicationEntity } from "~/entities/company/application";
import { InterviewStore } from "~/stores/company/interview";

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
const applications = computed(() => store.applications);
const meta = computed(() => store.meta);
const keyword = ref("");
const statusAll = -1;
const statusFilter = ref(statusAll);
const selectedRows = ref<BasicApplicationEntity[]>([]);

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

const jobId = Number(route.params.id);
onMounted(async () => {
  setQueryParams();

  await store.getListApplication(jobId, queryParams);
  // console.log(interviews.value);
});

const onRowClick = (event: { originalEvent: any; data: { id: number } }) => {
  if (
    event.originalEvent.target.type === "checkbox" ||
    event.originalEvent.target.closest(".p-checkbox-icon")
  ) {
    event.originalEvent.stopPropagation();
  } else {
    router.push({
      path: `${COMPANY_INTERVIEW}/${jobId}${APPLICATION_INTERVIEW}/${event.data.id}`,
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
      :is-empty="isEmpty(applications)"
      data-key="id"
      :value="applications"
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
      <Column header="Full name">
        <template #body="{ data }">
          <div class="flex justify-start w-full">
            {{ `${data.firstName} ${data.lastName}` }}
          </div>
        </template>
      </Column>
      <Column field="jobPositionName" header="Position name" />
      <Column field="email" header="Email" />
      <Column field="status" header="Status">
        <template #body="{ data }">
          <div class="flex justify-start w-full">
            {{
              INTERVIEW_STATUS_NAME[
                data.interviewStatus as keyof typeof INTERVIEW_STATUS_NAME
              ]
            }}
          </div>
        </template>
      </Column>
      <Column field="interviewDateTime" header="Interview date time at" />
    </KTADataTable>
  </LayoutsCompanyManageCompanyLayout>
</template>
