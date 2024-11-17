<script lang="ts" setup>
import type { CompanyEntity } from "~/entities/user/company";
import { COMPANY_TYPE } from "~/constants/company";

const props = defineProps({
  company: {
    type: Object as PropType<CompanyEntity>,
  },
});

onMounted(() => {});
</script>
<template>
  <div class="flex flex-col justify-center items-center p-4 gap-2">
    <img
      :src="props.company?.logo"
      alt=""
      class="w-[200px] h-[200px] border rounded-md"
    />
    <div class="flex justify-center w-1/3 gap-4">
      <div class="w-1/2 flex justify-between">
        <label class="text-md font-bold">Connectors</label>
        <div class="flex gap-2 items-center">
          <span class="text-md">
            {{
              Number(
                props.company?.connect_company
                  ? props.company?.connect_company.length
                  : 0,
              ) +
              Number(
                props.company?.connect_user
                  ? props.company?.connect_user.length
                  : 0,
              )
            }}</span
          >
          <span class="pi pi-users"> </span>
        </div>
      </div>
    </div>
    <div class="border w-full rounded-md grid grid-cols-4 p-2 gap-y-2">
      <span class="font-bold span-primary-hover text-md">Company name</span>
      <span class="col-span-3 text-xl text-center">{{
        props.company?.name
      }}</span>
      <span class="font-bold span-primary-hover text-md">Name in charge</span>
      <span class="col-span-3">{{ props.company?.name_in_charge }}</span>
      <span class="font-bold span-primary-hover text-md">Phone</span>
      <span class="col-span-3">{{ props.company?.phone }}</span>
      <span class="font-bold span-primary-hover text-md">Email</span>
      <span class="col-span-3">{{ props.company?.email }}</span>
      <span class="font-bold span-primary-hover text-md">Company type</span>
      <span class="col-span-3">{{
        COMPANY_TYPE[props.company?.company_type as keyof typeof COMPANY_TYPE]
      }}</span>
      <span class="font-bold span-primary-hover text-md">Address</span>
      <span class="col-span-3">{{ props.company?.address }}</span>
      <span class="font-bold span-primary-hover text-md">Detail address</span>
      <span class="col-span-3">{{ props.company?.detail_address }}</span>
      <span class="font-bold span-primary-hover text-md">Company size</span>
      <span class="col-span-3">{{ props.company?.size }}</span>
      <span
        v-if="props.company?.accessibility"
        class="font-bold span-primary-hover text-md"
        >Accessibility</span
      >
      <div
        class="col-span-3 frame-map"
        v-html="convertHTMLtoString(props.company?.accessibility ?? '')"
      />
    </div>
  </div>
</template>
<style lang="scss">
.frame-map iframe {
  height: 200px !important;
  width: 100% !important;
}
</style>
