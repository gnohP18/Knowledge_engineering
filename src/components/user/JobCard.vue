<script lang="ts" setup>
import type { SearchingJobEntity } from "~/entities/user/job";
import { COMPANY_TYPE } from "~/constants/company";
import { TYPE_OF_EMPLOYEE } from "~/constants/job";

const props = defineProps({
  job: {
    type: Object as PropType<SearchingJobEntity>,
  },
});

onMounted(() => {});
</script>
<template>
  <div class="primary-card flex gap-2 p-2">
    <img
      :src="props.job?.company?.logo"
      alt=""
      class="w-[150px] h-[150px] common-rounded"
    />
    <div class="flex-1 flex flex-col gap-2">
      <a :href="`/jobs/${props.job?.id}`" class="text-xl">
        {{ props.job?.title }}
      </a>
      <div class="w-full flex justify-between">
        <label for="position_name"
          >Position name:
          <span class="font-bold">
            {{ props.job?.position_name }}
          </span>
        </label>
      </div>
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
            {{
              COMPANY_TYPE[
                props.job?.company?.company_type as keyof typeof COMPANY_TYPE
              ]
            }}
          </span>
        </label>
      </div>
      <div class="w-full flex justify-between">
        <label for="employee_type"
          >Type of employee:
          <span class="font-bold">
            {{
              TYPE_OF_EMPLOYEE[
                props.job?.type_of_employee as keyof typeof TYPE_OF_EMPLOYEE
              ]
            }}
          </span>
        </label>
        <label for="company_type"
          >Salary:
          <span class="font-bold">
            {{
              convertSalary(
                props.job?.salary_from ?? 0,
                props.job?.salary_upto ?? 0,
              )
            }}
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
