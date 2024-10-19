<script lang="ts" setup>
definePageMeta({
  layout: "login",
});
</script>
<template>
  <div class="flex w-full h-full background-login justify-center items-center">
    <div
      class="w-1/2 min-h-[200px] flex flex-col justify-center items-center gap-4"
    >
      <label class="text-2xl text-white font-bold">Sign up</label>
      <div class="grid grid-cols-2 w-full gap-2">
        <CommonKTAInput
          :label="'Email'"
          parent-class="text-white text-md w-full"
          input-class="text-black w-full"
        />
        <CommonKTAInput
          :label="'Job Title'"
          parent-class="text-white text-md w-full"
          input-class="text-black w-full"
        />
      </div>
      <div class="grid grid-cols-2 w-full gap-2">
        <CommonKTAInput
          :label="'First name'"
          parent-class="text-white text-md w-full"
          input-class="text-black w-full"
        />
        <CommonKTAInput
          :label="'Last name'"
          parent-class="text-white text-md w-full"
          input-class="text-black w-full"
        />
      </div>
      <div class="grid grid-cols-2 w-full gap-2">
        <CommonKTAInput
          :label="'Address'"
          parent-class="text-white text-md w-full"
          input-class="text-black w-full"
        />
        <CommonKTAInput
          :label="'Detail address'"
          parent-class="text-white text-md w-full"
          input-class="text-black w-full"
        />
      </div>
      <div class="grid grid-cols-2 w-full gap-2">
        <CommonKTAPassword
          :label="'Password'"
          parent-class="text-white text-md w-full"
          input-class="text-black h-[40px] w-full"
        />
        <CommonKTAPassword
          :label="'Confirm password'"
          parent-class="text-white text-md w-full"
          input-class="text-black h-[40px] w-full"
        />
      </div>
      <div class="w-full flex items-center justify-center">
        <Button label="Login" class="my-5 p-2 !w-1/3 primary-button" />
      </div>
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
