<script setup lang="ts">
definePageMeta({
  layout: "login",
});
import { useField, useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';
import Validate from '~/components/common/Validate.vue';
import { loginApi } from '~/api/user/auth';
import { AuthStore } from '~/stores/user/auth';
const router = useRouter()
const authStore = AuthStore()

const validationSchema = toTypedSchema(
  zod.object({
    email: zod.string().min(1, { message: 'This is required' }).email({ message: 'Must be a valid email' }),
    password: zod.string().min(1, { message: 'This is required' }).min(8, { message: 'Too short' }),
  })
);

const { handleSubmit, errors } = useForm({
  validationSchema,
});

const onSubmit = handleSubmit(async (values) => {
  try {
    await authStore.login(values)
    router.push("/")
    console.log("Login successfully:", response)
  } catch (error) {
    console.error(error)
  }
});

const email = ref('')
const password = ref('')
</script>

<template>
  <div class="flex w-full h-full background-login justify-center items-center">
    <div
      class="w-1/4 min-h-[200px] flex flex-col justify-center items-center gap-4"
    >
    <label class="text-2xl text-white font-bold">LOGIN</label>
      <form @submit.prevent="onSubmit">
        <Validate label="Email" :error="errors.email" class="w-full">
          <CommonKTAInput v-model="email" name="email" class="w-full" />
        </Validate>
        <Validate label="Password" :error="errors.password" class="w-full mt-5">
          <CommonKTAInput v-model="password" name="password" class="w-full" />
        </Validate>
        <div class="w-full flex items-center justify-center">
          <Button type="submit" label="Login" class="my-5 p-2 !w-1/3 primary-button" />
        </div>
        </form>
      <a href="/" class="text-white font-bold">Back to home</a>
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