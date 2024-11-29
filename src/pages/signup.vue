<script lang="ts" setup>
import Validate from "~/components/common/Validate.vue";
import KTAInput from "~/components/common/KTAInput.vue";
import KTADropdown from "~/components/common/KTADropdown.vue";
import KTAPassword from "~/components/common/KTAPassword.vue";
import { useForm } from "vee-validate";
import { userSignUpSchema } from "~/schemas";
import { AuthStore } from "~/stores/user/auth";
import type { OptionSelect } from "~/entities/common";
definePageMeta({
  layout: "login",
  middleware: "auth-guest-user",
});

const { defineField, errors, handleSubmit } = useForm({
  validationSchema: userSignUpSchema,
});

const store = AuthStore();
const isLoading = computed(() => store.isLoading);
const jobPositions = computed(() => store.positions);

const [email] = defineField("email");
const [lastName] = defineField("last_name");
const [firstName] = defineField("first_name");
const [address] = defineField("address");
const [detailAddress] = defineField("detail_address");
const [password] = defineField("password");
const [passwordConfirmation] = defineField("passwordConfirmation");
const jobPositionSelected = ref<OptionSelect>();
onMounted(async () => {
  await store.getIndexSignUp({ limit: 100 }, { limit: 100 });
  jobPositionSelected.value = jobPositions.value[0];
});

const signup = handleSubmit(async () => {});
</script>
<template>
  <div class="flex w-full h-full background-login justify-center items-center">
    <div
      class="w-1/2 min-h-[200px] flex flex-col justify-center items-center gap-4 bg-white/[0.3] common-rounded p-5"
    >
      <label class="text-2xl text-primary font-bold span-primary-hover"
        >Sign up</label
      >

      <form @action.prevent="signup"></form>
      <div class="grid grid-cols-2 w-full gap-2">
        <Validate label="Email" :error="errors.email">
          <KTAInput v-model="email" class="w-full" />
        </Validate>
        <Validate label="Job Title">
          <KTADropdown
            v-if="jobPositions"
            v-model="jobPositionSelected"
            :options="jobPositions"
            filter
            option-label="name"
            class="w-full"
          />
        </Validate>
      </div>
      <div class="grid grid-cols-2 w-full gap-2">
        <Validate label="First name" :error="errors.first_name" class="w-full">
          <KTAInput v-model="firstName" class="w-full" />
        </Validate>
        <Validate label="Last name" :error="errors.last_name" class="w-full">
          <KTAInput v-model="lastName" class="w-full" />
        </Validate>
      </div>
      <div class="grid grid-cols-2 w-full gap-2">
        <Validate label="Address" :error="errors.address" class="w-full">
          <KTAInput v-model="address" class="w-full" />
        </Validate>
        <Validate
          label="Detail Address"
          :error="errors.detail_address"
          class="w-full"
        >
          <KTAInput v-model="detailAddress" class="w-full" />
        </Validate>
      </div>
      <div class="grid grid-cols-2 w-full gap-2">
        <Validate label="Password" :error="errors.password" class="w-full">
          <KTAPassword v-model="password" class="w-full" />
        </Validate>
        <Validate
          label="Password Confirmation"
          :error="errors.passwordConfirmation"
          class="w-full"
        >
          <KTAPassword v-model="passwordConfirmation" class="w-full" />
        </Validate>
      </div>
      <div class="w-full flex items-center justify-center">
        <Button
          label="Submit"
          @click="signup"
          class="my-5 p-2 !w-1/3 primary-button"
        />
      </div>
      <a href="/" class="text-primary font-bold">Back to home</a>
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
