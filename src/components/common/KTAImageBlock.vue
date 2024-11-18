<script setup lang="ts">
const bgGroup = [
  {
    beginWord: "K",
    caption: "Kickstart your career—apply today!",
    url: "/images/job_bg_1.jpeg",
  },
  {
    beginWord: "E",
    caption: "Explore exciting job opportunities with us!",
    url: "/images/job_bg_2.jpeg",
  },
  {
    beginWord: "S",
    caption: "Stay positive, your dream job is near!",
    url: "/images/job_bg_4.jpeg",
  },
  {
    beginWord: "I",
    caption: "Interviews are your chance to shine!",
    url: "/images/job_bg_3.jpeg",
  },
  {
    beginWord: "C",
    caption: "Connect and discover new career paths!",
    url: "/images/job_bg_5.jpeg",
  },
  {
    beginWord: "S",
    caption: "Showcase your skills, we want you on our team!",
    url: "/images/job_bg_6.jpeg",
  },
];
</script>
<template>
  <div class="flex w-full animation-visible">
    <div class="flex flex-col md:flex-row gap-3 h-[500px]">
      <div
        v-for="item in bgGroup"
        :class="`md:w-1/${bgGroup.length}`"
        class="common-rounded bg-item md:h-full relative"
      >
        <label class="absolute index common-rounded" for="index">{{
          item.beginWord
        }}</label>
        <label class="hidden absolute caption common-rounded" for="caption">{{
          item.caption
        }}</label>
        <img
          :src="item.url"
          alt=""
          class="w-full object-cover h-full common-rounded overflow-hidden"
        />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@media (max-width: 767px) {
  .bg-item {
    width: 100%;
    max-height: 200px;

    &::before {
      border-radius: 16px;
      content: "";
      position: absolute;
      top: 0; /* Đặt vị trí lớp phủ */
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.8); /* Lớp phủ đen với độ trong suốt */
      opacity: 1; /* Hiện lớp phủ khi không hover */
      transition: opacity 0.3s ease;
    }

    .index {
      top: 25%;
      // left: 50%;
      font-size: 80px;
      color: #ffffff;
      text-shadow:
        rgb(115, 115, 115) 10px 0px 20px,
        rgb(115, 115, 115) -10px 0px 20px,
        rgb(115, 115, 115) 0px 10px 20px,
        rgb(115, 115, 115) 0px -10px 20px;
      // display: inherit;
      text-align: center;
      transition: opacity 0.3s ease;
      min-width: 100%;
      overflow-x: hidden;
    }

    .caption {
      display: none;
    }
  }
}

@media (min-width: 768px) {
  .bg-item {
    width: 200%;
    transition: width 0.3s ease;

    .index {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #ffffff;
      display: none;
      transition: opacity 0.3s ease;
      pointer-events: none;
    }

    .caption {
      display: inherit;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 50px;
      text-align: center;
      font-weight: bold;
      color: #ffffff;
      text-shadow:
        rgb(115, 115, 115) 10px 0px 20px,
        rgb(115, 115, 115) -10px 0px 20px,
        rgb(115, 115, 115) 0px 10px 20px,
        rgb(115, 115, 115) 0px -10px 20px;
    }
  }

  .bg-item:not(:hover) {
    width: 100%;
    &::before {
      border-radius: 16px;
      content: "";
      position: absolute;
      top: 0; /* Đặt vị trí lớp phủ */
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.8); /* Lớp phủ đen với độ trong suốt */
      opacity: 1; /* Hiện lớp phủ khi không hover */
      transition: opacity 0.3s ease;
    }

    .index {
      top: 50%;
      left: 50%;
      font-size: 120px;
      color: #ffffff;
      text-shadow:
        rgb(115, 115, 115) 10px 0px 20px,
        rgb(115, 115, 115) -10px 0px 20px,
        rgb(115, 115, 115) 0px 10px 20px,
        rgb(115, 115, 115) 0px -10px 20px;
      display: inherit;
      text-align: center;
      transition: opacity 0.3s ease;
      min-width: 100%;
      overflow-x: hidden;
    }

    .caption {
      display: none;
    }
  }
}
</style>
