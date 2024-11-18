<script lang="ts" setup>
const contributors = [
  {
    name: "Nguyen Hoang Phong",
    avatar: "/images/contributors/phong.png",
    role: ["Product Manager", "Frontend Developer Lead"],
    introduce:
      "Always focusing on the real value for users and products, continuously innovating to bridge the gap between ideas and reality, while fostering a collaborative and creative work environment.",
  },
  {
    name: "Pham Van Tien Truong",
    avatar: "/images/contributors/truong.png",
    role: ["Backend Developer Lead", "DevOps"],
    introduce:
      "Streamlining processes, optimizing performance, and ensuring system stability, always seeking smart solutions to solve problems and continuously improving work quality.",
  },
  {
    name: "Nguyen Cong Anh",
    avatar: "/images/contributors/anh.png",
    role: ["AI Researcher", "Backend Developer"],
    introduce:
      "Creativity is the key to solving complex challenges, and AI technology is the tool to provide powerful, effective solutions, building a solid foundation for the future.",
  },
  {
    name: "Than Nguyen Minh Quan",
    avatar: "/images/contributors/quan.png",
    role: ["Backend Developer"],
    introduce:
      "Creating simple, powerful, and maintainable systems, with a focus on performance and scalability to support sustainable product growth.",
  },
  {
    name: "Hoang Huan",
    avatar: "/images/contributors/huan.jpg",
    role: ["Frontend Developer"],
    introduce:
      "Every line of code is a step towards a perfect user experience, always seeking innovation in design and technology to deliver intuitive and optimized interfaces.",
  },
  {
    name: "Tran Xuan Nguyen",
    avatar: "/images/contributors/nguyen.jpeg",
    role: ["Backend Developer"],
    introduce:
      "Constantly improving processes and seeking optimal solutions to build stable, robust, and scalable systems, while ensuring the long-term growth of the product.",
  },
];
</script>
<template>
  <section class="flex items-center justify-center background-default-135deg">
    <div
      class="container flex flex-col xl:flex-row justify-between items-center"
    >
      <div class="flex items-center justify-center">
        <span
          class="text-[30px] md:text-[40px] xl:text-[50px] font-bold montserrat-font hover:text-white transition-all duration-300"
          >OUR CONTRIBUTORS</span
        >
      </div>
      <div
        class="flex flex-col justify-center items-center gap-x-4 gap-y-2 p-2"
      >
        <div
          v-for="(contributor, index) in contributors"
          class="w-[300px] sm:w-[300px] md:w-[400px] lg:w-[500px] xl:w-[600px] max-w-[600px] flex justify-between primary-card p-2 relative profile-card zoom-effect"
          :class="{
            'flex-row-reverse': index % 2 === 1,
            'flex-row': index % 2 !== 1,
          }"
        >
          <img
            :src="contributor.avatar"
            :alt="contributor.name"
            class="max-w-[50px] xl:max-w-[120px] max-h-[50px] xl:max-h-[120px] rounded-full object-cover"
          />
          <div class="flex flex-col gap-y-4">
            <span class="montserrat-font xl:text-xl font-bold">{{
              contributor.name
            }}</span>
            <div class="flex flex-col gap-y-2">
              <span
                class="span-primary-hover"
                :class="{
                  'text-start': index % 2 === 1,
                  'text-end': index % 2 !== 1,
                }"
                v-for="role in contributor.role"
                >{{ role }}</span
              >
            </div>
          </div>
          <div
            class="w-full h-full absolute hidden hover:flex justify-center items-center md:caption p-2 common-rounded"
            :class="{
              'hover:flex-row-reverse': index % 2 === 1,
              'hover:flex-row': index % 2 !== 1,
            }"
          >
            <img
              :src="contributor.avatar"
              :alt="contributor.name"
              class="max-w-[120px] max-h-[120px] rounded-full object-cover"
            />
            <span class="text-white h-full text-md xl:text-xl text-center">{{
              contributor.introduce
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.background-color-reserve {
  background: hsla(179, 83%, 40%, 1);
  background: linear-gradient(
    135deg,
    hsla(179, 83%, 40%, 1) 0%,
    hsla(0, 0%, 100%, 1) 100%
  );
  background: -moz-linear-gradient(
    135deg,
    hsla(179, 83%, 40%, 1) 0%,
    hsla(0, 0%, 100%, 1) 100%
  );
  background: -webkit-linear-gradient(
    135deg,
    hsla(179, 83%, 40%, 1) 0%,
    hsla(0, 0%, 100%, 1) 100%
  );
}

.text-color-gradient {
  background: linear-gradient(
    255deg,
    rgb(10, 107, 105) 0%,
    rgb(114, 114, 114) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
//

.profile-card {
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8); /* Lớp phủ đen */
    border-radius: 16px;
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  .caption {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: none;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 16px;
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  &:hover {
    &::before {
      opacity: 1;
    }

    .caption {
      display: flex;
      opacity: 1;
    }
  }
}
</style>
