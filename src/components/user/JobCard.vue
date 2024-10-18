<script lang="ts" setup>
import type { BasicJobEntity } from "~/entities/job";

const props = defineProps({
  job: {
    type: Object as PropType<BasicJobEntity>,
  },
});

onMounted(() => {});
</script>
<template>
  <div class="primary-card flex gap-2 p-2">
    <img :src="props.job?.company?.logo" alt="" class="w-[150px] h-[150px]" />
    <div class="flex-1 flex flex-col gap-2">
      <a :href="`/jobs/${props.job?.id}`" class="text-xl">
        {{ props.job?.title }}
      </a>
      <div class="w-full flex justify-between">
        <a
          :href="`/connectors/company/${props.job?.company?.id}`"
          class="text-md"
        >
          {{ props.job?.company?.name }}
        </a>
        <label for="company_type"
          >Company type:
          <span class="font-bold">
            {{ props.job?.company?.company_type }}
          </span>
        </label>
      </div>
      <div class="w-full flex justify-between">
        <label for="employee_type"
          >Type of employee:
          <span class="font-bold">
            {{ props.job?.type_of_employee }}
          </span>
        </label>
        <label for="company_type"
          >Salary:
          <span class="font-bold">
            {{ props.job?.salary_from }} - {{ props.job?.salary_upto }}
          </span>
        </label>
      </div>
      <div class="w-full flex justify-between">
        <label for="company_type"
          >Company size:
          <span class="font-bold">
            {{ props.job?.company?.size }}
          </span>
        </label>
        <label for="company_type"
          >Location:
          <span class="font-bold">
            {{ props.job?.company?.address }}
          </span>
        </label>
      </div>
      <div class="flex flex-wrap gap-2">
        <div v-for="tag in props.job?.hashtag">
          <Chip
            :label="`#${mappingHashtag(Number(tag)).name}`"
            class="text-sm hashtag-item"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.hashtag-item {
  &:hover {
    color: #11b9b5;
  }
}
</style>
