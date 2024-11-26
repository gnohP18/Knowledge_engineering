<script lang="ts" setup>
import Profile from "~/components/user/Profile.vue";
import { AuthStore } from "~/stores/user/auth";

definePageMeta({
  layout: "user",
  middleware: "auth-user",
});
const store = AuthStore();
const me = computed(() => store.me);
const isLoading = computed(() => store.isLoading);

onMounted(async () => {
  await store.getMe();
});
</script>

<template>
  <CommonKTALoading v-if="isLoading" />
  <div v-else class="primary-card">
    <Profile :user="me" is-preview />
  </div>
</template>
<style lang="scss" scoped></style>
