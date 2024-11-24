<script lang="ts" setup>
import { get, isEmpty } from "lodash-es";
import ConnectorCard from "~/components/user/ConnectorCard.vue";
import KTALoading from "~/components/common/KTALoading.vue";
import * as Pagination from "~/constants/pagination";
import { userStageConnectorStore } from "~/stores/user/connector";
import { QUERY_OPTIONS } from "~/constants/common";
import type { OptionSelect } from "~/entities/common";

definePageMeta({
  layout: "user",
  middleware: ["auth-user"],
});

const route = useRoute();
const router = useRouter();

const store = userStageConnectorStore();
const connectors = computed(() => store.connectors);
const isLoading = computed(() => store.isLoading);
const meta = computed(() => store.meta);

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

const queryOptionSelected = ref<OptionSelect>(QUERY_OPTIONS[0]);

watch(
  () => route.query,
  () => {
    setQueryParams();
    store.getSuggestConnectorList(queryOptionSelected.value.id, queryParams);
  },
);

onBeforeMount(() => {
  store.resetState();
});

onMounted(async () => {
  await store.getSuggestConnectorList(
    queryOptionSelected.value.id,
    queryParams,
  );
});

const currentPage = ref<number>(1);
const firstRecordIndex = computed(() => {
  return (currentPage.value - 1) * Number(meta.value?.per_page);
});

const onChangePaginator = async (event: any) => {
  queryParams.page = String(Number(event.page) + 1);
  queryParams.limit = event.rows;

  await store.getSuggestConnectorList(
    queryOptionSelected.value.id,
    queryParams,
  );
};

const changeQueryOption = async () => {
  queryParams.page = "1";
  queryParams.limit = Pagination.PAGE_LIMIT_DEFAULT;

  await store.getSuggestConnectorList(
    queryOptionSelected.value.id,
    queryParams,
  );
};

const reloadPage = async () => {
  await store.getSuggestConnectorList(
    queryOptionSelected.value.id,
    queryParams,
  );
};
</script>

<template>
  <KTALoading v-if="isLoading" />
  <div v-else class="layout-main container flex flex-col gap-2">
    <SelectButton
      v-model="queryOptionSelected"
      :options="QUERY_OPTIONS"
      optionLabel="name"
      @change="changeQueryOption"
    />
    <div
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 h-full"
    >
      <div v-for="connector in connectors">
        <ConnectorCard
          :connector="connector"
          class="zoom-effect"
          @reload="reloadPage"
        />
      </div>
    </div>
    <Paginator
      v-if="!isEmpty(connectors)"
      class="flex justify-end font-14"
      :rows="10"
      :total-records="Number(meta?.total)"
      :page-link-size="Pagination.PAGE_LINK_SIZE"
      :first="firstRecordIndex"
      @page="onChangePaginator"
    />
  </div>
</template>
<style lang="scss" scoped>
:deep(.p-highlight) {
  &::before {
    background-color: #11b9b5;
  }

  .p-button-label {
    color: white;
  }
}
</style>
