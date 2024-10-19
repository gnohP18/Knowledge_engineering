<script lang="ts" setup>
import { USER_EXAMPLE } from "~/constants/sample";
import { sleep } from "@whoj/utils-core";
import type { UserEntity } from "~/entities/user/user";
import Profile from "~/components/user/Profile.vue";

definePageMeta({
  layout: "user",
  middleware: "auth-user",
});
const user = ref<UserEntity>();
const isLoading = ref<boolean>(false);

onMounted(async () => {
  isLoading.value = true;
  sleep(2);
  user.value = USER_EXAMPLE;
  isLoading.value = false;
});
</script>

<template>
  <CommonKTALoading v-if="isLoading" />
  <div v-else class="primary-card">
    <Profile :user="user" />
  </div>
</template>
<style lang="scss" scoped></style>
