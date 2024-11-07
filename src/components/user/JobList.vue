<script lang="ts" setup>
import type { SearchingJobEntity } from "~/entities/user/job";
import JobCard from "~/components/user/JobCard.vue";
import * as Pagination from "~/constants/pagination";
import type { PropType } from "vue";
import type { MetaEntity } from "~/entities/meta";

const props = defineProps({
  jobs: {
    type: Array<SearchingJobEntity>,
  },
  meta: {
    type: Object as PropType<MetaEntity>,
    default: () => {},
  },
});

const emits = defineEmits(["changePaginator"]);

const currentPage = ref<number>(1);
const firstRecordIndex = computed(() => {
  return (currentPage.value - 1) * Number(props.meta?.per_page);
});

const onChangePaginator = (event: any) => {
  const entityParam = {
    Page: Number(event.page) + 1,
    Limit: event.rows,
  };

  emits("changePaginator", entityParam);
};
</script>
<template>
  <div class="flex flex-col w-full gap-2">
    <div class="grid w-full h-full grid-cols-1 md:grid-cols-2 gap-2">
      <div v-for="job in props.jobs">
        <JobCard :job="job" />
      </div>
    </div>
    <Paginator
      class="flex justify-end font-14"
      :rows="10"
      :total-records="Number(props.meta?.total)"
      :page-link-size="Pagination.PAGE_LINK_SIZE"
      :first="firstRecordIndex"
      @page="onChangePaginator"
    />
  </div>
</template>
<style lang="scss" scoped></style>
