<script lang="ts" setup></script>
<template>
  <div class="w-full mx-auto">
    <label
      for="default-search"
      class="mb-2 text-sm font-medium text-gray-900 sr-only"
      >Search</label
    >
    <div class="relative rounded-xl">
      <div
        class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none rounded-xl"
      >
        <svg
          class="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
      <InputText
        v-bind="$attrs"
        class="searching-input block w-full p-4 ps-10 text-sm text-gray-900 border rounded-2xl"
        placeholder="Job searching..."
        required
      />
      <div
        class="absolute flex items-center justify-center inset-y-0 end-[1%] ps-4"
      >
        <Button
          v-tooltip="'Press Enter to search'"
          class="border px-4 h-1/2"
          label="↵"
        ></Button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.searching-input {
  &:hover,
  &:focus {
    border-color: #11b9b5;
  }
}
</style>
