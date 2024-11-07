<script setup lang="ts">
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

const contributor = [
  {
    name: "Nguyen Hoang Phong",
    role: ["Project manager", "Frontend Developer"],
    avatar: "/images/phong.png",
  },
  {
    name: "Nguyen Cong Anh",
    role: ["AI Researcher"],
    avatar: "/images/anh.png",
  },
  {
    name: "Pham Van Tien Truong",
    role: ["Backend Developer", "DevOps"],
    avatar: "/images/truong.png",
  },
  {
    name: "Than Nguyen Minh Quan",
    role: ["Backend developer"],
    avatar: "/images/quan.png",
  },
];

const emits = defineEmits(["close"]);

const close = () => {
  emits("close", false);
};
</script>

<template>
  <Dialog
    v-model:visible="props.visible"
    modal
    :style="{ width: '45rem' }"
    :breakpoints="{ '768px': '20rem' }"
  >
    <template #container="{ closeCallback }">
      <div class="hidden md:block p-4 flex-col gap-3 overflow-scroll">
        <p class="text-2xl span-primary-hover">
          Welcome back, Dr.KHUAT Thank Tung! 🎉🎉🎉
        </p>
        <div class="flex flex-col gap-y-4">
          <span class="span-primary-hover"
            >1. Below are the available functions that you can test:</span
          >
          <div class="flex px-4 gap-2 flex-col">
            <span class="span-item">a. Search job</span>
            <span class="span-item"
              >b. See detail job (after search you can see attributes of the
              job)</span
            >
            <span class="span-item"
              >c. Login company (go to <span class="pi pi-user"></span> on top
              bar) Click on 👉 <strong>Business Login</strong> We just provided
              the company account for you</span
            >
            <span class="span-item">d. Create job (require login company)</span>
            <span class="span-item">e. See job by (require login company)</span>
            <span class="span-item">f. Update job (require login company)</span>
            <span class="span-item"
              >👉 After creating job, please wait
              <strong>30 seconds</strong> for Database (if you search with AI),
              In case of searching without using AI, you can find it
              immediately</span
            >
          </div>
          <span class="span-primary-hover"
            >2. If you encounter an error during the API call, you can go to the
            <strong
              >Troubleshoot (<span class="pi pi-question-circle"></span> on the
              top bar)</strong
            >
            page to follow the steps. In case you cannot fix the error on
            production, you can inbox our team member
            <strong>Nguyen Cong Anh (student code 102200122)</strong> for any
            period of time.</span
          >
          <span class="text-center span-primary-hover"
            >🥰 We hope you enjoy our products. 🥳 ❤️</span
          >
        </div>
        <span class="w-full text-xl text-center font-bold"
          >Our contributors</span
        >
        <div class="grid grid-cols-4">
          <div v-for="item in contributor" class="flex flex-col items-center">
            <img
              :src="item.avatar"
              :alt="item.name"
              class="w-[100px] h-[100px] rounded-full"
            />
            <div class="flex flex-col justify-center">
              <span class="span-primary-hover font-bold">{{ item.name }}</span>
              <span
                v-for="role in item.role"
                class="text-sm span-primary-hover text-center"
                >{{ role }}</span
              >
            </div>
          </div>
        </div>
        <div class="flex justify-center">
          <Button
            class="primary-button !w-[80px]"
            label="I got it!"
            @click="close"
          />
        </div>
      </div>
      <div class="block md:hidden p-2">
        <p class="text-xl span-primary-hover">
          Use the desktop web version for a better experience 👨‍💻🎉🎉🎉
        </p>
        <div class="flex justify-center p-2">
          <Button
            class="primary-button !w-[80px]"
            label="I got it!"
            @click="close"
          />
        </div>
      </div>
    </template>
  </Dialog>
</template>

<style></style>
