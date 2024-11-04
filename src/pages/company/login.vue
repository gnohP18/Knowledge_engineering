<script lang="ts" setup>
import { useForm } from "vee-validate";
import KTAPassword from "~/components/common/KTAPassword.vue";
import type { CompanyLoginEntity } from "~/entities/company/auth";
import Validate from "~/components/common/Validate.vue";
import { companyLoginSchema } from "~/schemas";
import { AuthStore } from "~/stores/company/auth";

useHead({ title: "Login company" });

definePageMeta({
  layout: "login",
});

const { handleSubmit, errors, defineField } = useForm({
  validationSchema: companyLoginSchema,
});

const store = AuthStore();

const onSubmit = handleSubmit(async (values) => {
  const companyLogin: CompanyLoginEntity = {
    email: values.email,
    password: values.password,
  };

  await store.login(companyLogin);
});

const [email] = defineField("email");
const [password] = defineField("password");
</script>
<template>
  <div class="flex w-full h-full background-login justify-center items-center">
    <div
      class="w-1/4 min-h-[200px] flex flex-col justify-center items-center gap-4"
    >
      <label class="text-2xl text-white font-bold">LOGIN</label>
      <form @submit.prevent="onSubmit" class="w-full">
        <Validate label="Email" :error="errors.email" class="w-full">
          <CommonKTAInput v-model="email" name="email" class="w-full" />
        </Validate>
        <Validate label="Password" :error="errors.password" class="w-full">
          <KTAPassword v-model="password" name="password" class="w-full" />
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
