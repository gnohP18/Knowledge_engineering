<script setup lang="ts">
import { useForm } from "vee-validate";
import KTALoading from "~/components/common/KTALoading.vue";
import KTAPassword from "~/components/common/KTAPassword.vue";
import Validate from "~/components/common/Validate.vue";
import { COMPANY_LOGIN, USER_SIGNUP } from "~/constants/route";
import type { UserLoginEntity } from "~/entities/user/auth";
import { userLoginSchema } from "~/schemas/user/auth.schema";
import { AuthStore } from "~/stores/user/auth";

useHead({ title: "Login" });

definePageMeta({
  layout: "login",
  middleware: ["auth-guest-user"],
});

const store = AuthStore();
const isLoading = computed(() => store.isLoading);
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
</script>

<template>
  <KTALoading v-if="isLoading" />
  <div
    v-else
    class="flex w-full h-full background-login justify-center items-center"
  >
    <div
      class="md:w-1/4 min-h-[200px] flex flex-col justify-center items-center gap-2 p-5 common-rounded bg-black/[0.3]"
    >
      <label class="text-2xl text-white font-bold span-primary-hover"
        >LOGIN</label
      >
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
      <a class="text-white" :href="USER_SIGNUP"
        >Don't have account? Sign up now!</a
      >
      <a class="text-white" :href="COMPANY_LOGIN">Business Login</a>
      <a class="text-white" href="/">Home</a>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.background-login {
  background-image: url("../assets/images/test1.png");
  background-repeat: no-repeat;
  background-size: cover;
}

.p-label.h6 {
  color: white;
}
</style>
