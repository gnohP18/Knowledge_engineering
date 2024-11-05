<script setup lang="ts">
const config = useRuntimeConfig();

useHead({ title: "Troubleshooting" });
definePageMeta({
  layout: "user",
});

const url = {
  authService: `${config.public.API_BASE_URL}authen-service/swagger/index.html`,
  userService: `${config.public.API_BASE_URL}user-service/swagger`,
  jobService: `${config.public.API_BASE_URL}job-service/swagger/index.html`,
  interviewService: `${config.public.API_BASE_URL}interview-service/swagger/index.html`,
  uploadService: `${config.public.API_BASE_URL}upload-service/swagger/index.html`,
  mailService: `${config.public.API_BASE_URL}mail-service/swagger/index.html`,
};
</script>
<template>
  <div
    class="container primary-card flex flex-col justify-center p-4 troubleshooting text-primary"
  >
    <p class="span-primary-hover text-2xl font-bold">Troubleshooting</p>
    <div class="flex flex-col border common-rounded p-2">
      <p class="span-primary-hover text-md font-semibold">
        Problem 1: If facing any about trusted URL, please follow these steps:
      </p>
      <ul class="ml-[10px] md:ml-[40px] step-guideline gap-y-2 flex flex-col">
        <li>Access all URL below:</li>
        <div class="flex flex-col">
          <a class="ml-4 text-sm underline" :href="url.authService"
            >Authentication Service</a
          >
          <a class="ml-4 text-sm underline" :href="url.userService"
            >User Service</a
          >
          <a class="ml-4 text-sm underline" :href="url.jobService"
            >Job Service</a
          >
        </div>
        <li>Click "Advanced" button</li>
        <li>Click into link Proceed to (...) (unsafe)</li>
        <li>
          If you see the swagger screen of the link, your action is successful
        </li>
        <li>Reload your page!!</li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.step-guideline {
  list-style-type: decimal;
}

.url-trusted {
  list-style-type: circle;
}
</style>
