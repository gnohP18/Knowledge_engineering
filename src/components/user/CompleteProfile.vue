<script lang="ts" setup>
import type { UserEntity } from "~/entities/user/user";

const props = defineProps({
  user: {
    type: Object as PropType<UserEntity>,
  },
});

const countCompleteField = (user: UserEntity | undefined) => {
  let emptyFieldsCount = -1;

  if (!user) {
    return emptyFieldsCount;
  }

  Object.keys(user).forEach((key) => {
    const value = user[key as keyof UserEntity];

    switch (typeof value) {
      case "boolean":
        emptyFieldsCount++;
        break;
      case "object":
        if (Object.keys(value).length > 0) {
          emptyFieldsCount++;
        }
        break;
      case "string":
        if (value) {
          emptyFieldsCount++;
        }
        break;
      case "number":
        if (value) {
          emptyFieldsCount++;
        }
        break;

      default:
        break;
    }
  });

  const percentage = (emptyFieldsCount / (Object.keys(user).length - 1)) * 100;

  return Number(percentage.toFixed(0));
};

const percentage = ref<number>(100);
onMounted(() => {
  percentage.value = countCompleteField(props.user);
});
</script>
<template>
  <div class="flex flex-col w-full bg-white rounded-2xl p-2 gap-2">
    <label class="font-bold">Complete profile</label>
    <ProgressBar :value="countCompleteField(props.user)">
      {{ countCompleteField(props.user) }} / 100%
    </ProgressBar>
  </div>
</template>
<style lang="scss" scoped>
:deep(.p-progressbar .p-progressbar-value) {
  background-color: #11b9b5 !important;
}
</style>
