<script setup lang="ts">
import { useForm } from "vee-validate";
import Validate from "~/components/common/Validate.vue";
import type { UserLoginEntity } from "~/entities/user/auth";
import { userLoginSchema } from "~/schemas/user/auth.schema";
import { AuthStore } from "~/stores/user/auth";

useHead({ title: "Login" });

definePageMeta({
  layout: "login",
});

const store = AuthStore();

const { handleSubmit, errors, defineField } = useForm({
  validationSchema: userLoginSchema,
});

const [email] = defineField("email");
const [password] = defineField("password");

const onSubmit = handleSubmit(async (values) => {
  const userLogin: UserLoginEntity = {
    email: values.email,
    password: values.password,
  };

  await store.login(userLogin);
});

const test = async () => {
  await store.login({ email: "12323", password: "result.data.access_token" });
};
</script>

<template>
  <div class="flex w-full h-full background-login justify-center items-center">
    <div
      class="w-1/4 min-h-[200px] flex flex-col justify-center items-center gap-4"
    >
      <label class="text-2xl text-white font-bold">LOGIN</label>
      <form @submit.prevent="onSubmit" class="w-full">
        <Validate label="Email" :error="errors.email" class="w-full">
          <CommonKTAInput v-model="email" class="w-full" />
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
  background-image: url("../assets/images/test1.jpeg");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
