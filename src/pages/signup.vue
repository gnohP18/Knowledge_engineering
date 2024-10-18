<script lang="ts" setup>
definePageMeta({
  layout: "login",
});
import { useForm } from 'vee-validate';
import * as zod from 'zod';
import Validate from '~/components/common/Validate.vue';
import { signupApi} from '~/api/user/auth';
import { ref, onMounted } from 'vue';
import { validationSchema } from '~/api/user/auth.schema';
import { AuthStore } from '~/stores/user/auth';
import { useRouter } from 'vue-router';
const router = useRouter()
const authStore = AuthStore()

const { handleSubmit, errors } = useForm({
  validationSchema,
});

const jobTitles = ref<{ value: string, text: string }[]>([]); 
const selectedJobTitle = ref<string | null>(null);
const fetchJobTitles = async () => {
  try {
    const response = await fetch('/api/user/auth.schema.ts'); 
    const data = await response.json();
    jobTitles.value = data; 
  } catch (error) {
    console.error('Failed to fetch job titles:', error);
    jobTitles.value = ['Software Engineer', 'Product Manager', 'Designer', 'Data Scientist'];
  }
};

onMounted(() => {
  fetchJobTitles();
});

const onSubmit = handleSubmit(async (values) => {
  try {
    await authStore.signup(values);  
    router.push("/login");
    console.log("Sign up successfully:", response);
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <div class="flex w-full h-full background-login justify-center items-center">
    <div class="w-1/2 min-h-[200px] flex flex-col justify-center items-center gap-4">
      <label class="text-2xl text-white font-bold">Sign Up</label>
      <form @submit.prevent="onSubmit" class="w-full grid grid-cols-2 gap-4">
        <Validate label="First name" :error="errors.first_name" class="w-full">
          <CommonKTAInput name="first_name" class="w-full" />
        </Validate>
    
        <Validate label="Last name" :error="errors.last_name" class="w-full">
          <CommonKTAInput name="last_name" class="w-full" />
        </Validate>
    
        <Validate label="Email" :error="errors.email" class="w-full">
          <CommonKTAInput name="email" class="w-full" placeholder="Email" />
        </Validate>
    
        <Validate label="Job Title" :error="errors.job_title" class="w-full">
          <CommonKTADropdown
            type="select"
            :options="jobTitles"
            class="w-full"
            name="job_title"
            v-model="selectedJobTitle"
          />
        </Validate>
    
        <Validate label="Address" :error="errors.address" class="w-full">
          <CommonKTAInput name="address" class="w-full" placeholder="Address" />
        </Validate>
    
        <Validate label="Address Detail" :error="errors.address_detail" class="w-full">
          <CommonKTAInput name="address_detail" class="w-full" placeholder="Address detail" />
        </Validate>
    
        <Validate label="Password" :error="errors.password" class="w-full">
          <CommonKTAInput name="password" type="password" class="w-full" placeholder="Password" />
        </Validate>
    
        <Validate label="Confirm Password" :error="errors.confirmPassword" class="w-full">
          <CommonKTAInput name="confirmPassword" type="password" class="w-full" placeholder="Confirm Password" />
        </Validate>
    
        <div class="col-span-2 flex items-center justify-center">
          <Button
            type="submit"
            label="Sign Up"
            class="my-6 p-2 w-1/2 primary-button"
            @keydown.ctrl.enter="onSubmit"
          />
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

select {
  background-color: #f8f8f8;
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 4px;
  width: 100%;
}
</style>
