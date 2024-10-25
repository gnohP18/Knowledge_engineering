<script lang="ts" setup>
import { useForm } from "vee-validate";
import Validate from "~/components/common/Validate.vue";
import { AuthStore } from "~/stores/admin/auth";
import type { AdminLoginEntity } from "~/entities/admin/auth";
import { adminLoginSchema } from "~/schemas/admin/auth.schema";

useHead({ title: "Login admin" });

definePageMeta({
  layout: "login",
});

const { handleSubmit, errors, defineField } = useForm({
  validationSchema: adminLoginSchema,
});

const store = AuthStore();

const onSubmit = handleSubmit(async (values) => {
  const companyLogin: AdminLoginEntity = {
    username: values.username,
    password: values.password,
  };

  await store.login(companyLogin);
});

const [username] = defineField("username");
const [password] = defineField("password");
</script>
<template>
  <div class="flex w-full h-full background-login justify-center items-center">
    <div
      class="w-1/4 min-h-[200px] flex flex-col justify-center items-center gap-4"
    >
      <label class="text-2xl text-white font-bold">LOGIN</label>
      <form @submit.prevent="onSubmit" class="w-full">
        <Validate label="Username" :error="errors.username" class="w-full">
          <CommonKTAInput v-model="username" class="w-full" />
        </Validate>
        <Validate label="Password" :error="errors.password" class="w-full">
          <CommonKTAInput v-model="password" class="w-full" />
        </Validate>
        <div class="w-full flex items-center justify-center">
          <Button
            label="Login"
            class="my-5 p-2 !w-1/3 primary-button"
            type="submit"
            @keydown.ctrl.enter="onSubmit"
          />
        </div>
      </form>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.background-login {
  background-image: url("/src/assets/images/test1.jpeg");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
