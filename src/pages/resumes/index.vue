<script lang="ts" setup>
import { get, isEmpty } from "lodash-es";
import KTADataTable from "~/components/common/KTADataTable.vue";
import type { BasicResumeEntity } from "~/entities/user/resume";
import * as Pagination from "~/constants/pagination";
import { userResumeStore } from "~/stores/user/resume";
import KTAUploadFile from "~/components/common/KTAUploadFile.vue";
import { MEDIA_FILE_TYPE_RESUME } from "~/constants/common";

useHead({
  title: "List resume",
});
definePageMeta({
  layout: "user",
  middleware: "auth-user",
});

const store = userResumeStore();

const route = useRoute();
const router = useRouter();

const isLoading = computed(() => store.isLoading);
const isSucceed = computed(() => store.isSucceed);
const resumes = computed(() => store.resumes);
const meta = computed(() => store.meta);
const keyword = ref("");
const statusAll = -1;
const statusFilter = ref(statusAll);

const selectedRows = ref<BasicResumeEntity[]>([]);

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
  store.getResumeList(queryParams);
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

const visible = ref<boolean>(false);
const uploadFile = async (files: File[]) => {
  const form = new FormData();
  form.append("file", files[0]);
  form.append("name", files[0].name);
  form.append("type", String(MEDIA_FILE_TYPE_RESUME));
  form.append("description", "");

  await store.uploadResume(form);

  if (!isLoading.value && isSucceed.value) {
    toastSuccess("Success", "Upload successfully");
    visible.value = false;
    await store.getResumeList(queryParams);
  }
};

const visibleRemoveResume = ref<boolean>(false);
const currentSelectResume = ref<number>(0);
const removeFile = async () => {
  await store.removeResume(currentSelectResume.value);

  if (!isLoading.value && isSucceed.value) {
    toastSuccess("Success", "Remove resume successfully");
    visibleRemoveResume.value = false;
    await store.getResumeList(queryParams);
  }
};
</script>
<template>
  <div class="flex flex-col gap-y-2">
    <div class="flex justify-between items-center">
      <label for="resume" class="text-xl font-bold">Your Resume</label>
      <Button
        label="Upload"
        icon="pi pi-upload"
        class="w-[100px] h-[40px] p-2 custom-button"
        @click="visible = true"
      />
    </div>
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
      <Column field="name" header="Name" />
      <Column header="Action">
        <template #body="{ data }">
          <div class="flex justify-start w-full gap-x-4">
            <a
              v-tooltip="'Preview'"
              :href="data.media_file_info.url"
              target="_blank"
              class="pi pi-eye"
            ></a>
            <span
              v-tooltip="'Delete file'"
              class="pi pi-times"
              @click="
                () => {
                  visibleRemoveResume = true;
                  currentSelectResume = data.id;
                }
              "
            ></span>
          </div>
        </template>
      </Column>
    </KTADataTable>
    <Dialog
      v-model:visible="visible"
      modal
      :style="{ width: '45rem' }"
      :breakpoints="{ '768px': '20rem' }"
    >
      <template #container="{ closeCallback }">
        <div
          v-if="isLoading"
          class="flex items-center justify-center min-h-[200px]"
        >
          <img
            class="w-[35px] h-[35px] animate-spin"
            src="/images/loading.svg"
            alt="Loading icon"
          />
        </div>
        <div v-else class="p-2">
          <KTAUploadFile :maximum-file="1" :max-file="5" @upload="uploadFile" />
          <div class="flex justify-end">
            <Button
              label="Close"
              class="custom-button w-[80px] h-[40px]"
              @click="visible = false"
            />
          </div>
        </div>
      </template>
    </Dialog>

    <Dialog
      v-model:visible="visibleRemoveResume"
      modal
      :style="{ width: '45rem' }"
      :breakpoints="{ '768px': '20rem' }"
    >
      <template #container="{ closeCallback }">
        <div
          v-if="isLoading"
          class="flex items-center justify-center min-h-[200px]"
        >
          <img
            class="w-[35px] h-[35px] animate-spin"
            src="/images/loading.svg"
            alt="Loading icon"
          />
        </div>
        <div v-else class="p-4">
          <span class="text-xl">❌ Do you want delete this resume?</span>
          <div class="flex justify-end gap-x-2">
            <Button
              label="Close"
              class="custom-button w-[80px] h-[40px]"
              @click="visibleRemoveResume = false"
            />
            <Button
              label="Sure"
              class="custom-button w-[80px] h-[40px]"
              @click="removeFile"
            />
          </div>
        </div>
      </template>
    </Dialog>
  </div>
</template>
<style lang="scss" scoped>
.menu-item {
  &:hover {
    border-color: #11b9b5;
    border-width: 2px;
  }
}
</style>
