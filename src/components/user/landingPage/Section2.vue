<script lang="ts" setup></script>
<template>
  <section
    class="h-screen background-default-45deg flex items-center justify-center"
  >
    <div
      class="container grid md:grid-flow-row grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2 p-2"
    >
      <div
        class="w-full h-full flex flex-col primary-card p-2 item-card gap-4 zoom-effect"
      >
        <div
          class="border border-[#3e4a56] rounded-full block p-2 w-[40px] h-[40px] text-center justify-center items-center"
        >
          <span class="pi pi-search"></span>
        </div>
        <span class="font-bold text-xl item-title span-primary-hover">
          Job Search Made Easy
        </span>
        <span class="item-content text-justify"
          >Effortlessly browse through a vast range of job Opportunities in
          various industries and locations.</span
        >
      </div>
      <div
        class="w-full h-full flex flex-col primary-card p-2 item-card gap-4 zoom-effect"
      >
        <div
          class="border border-[#3e4a56] rounded-full block p-2 w-[40px] h-[40px] text-center justify-center items-center"
        >
          <span class="pi pi-briefcase"></span>
        </div>
        <span class="font-bold text-xl item-title span-primary-hover">
          Employer Solutions
        </span>
        <span class="item-content text-justify"
          >Streamline your recruitment process with our tailored employer
          services.</span
        >
      </div>
      <div
        class="w-full h-full flex flex-col primary-card p-2 item-card gap-4 zoom-effect"
      >
        <div
          class="border border-[#3e4a56] rounded-full block p-2 w-[40px] h-[40px] text-center justify-center items-center"
        >
          <span class="pi pi-bell"></span>
        </div>
        <span class="font-bold text-xl item-title span-primary-hover">
          Personalized Job Alerts
        </span>
        <span class="item-content text-justify"
          >Stay ahead of the curve with personalized job alerts delivered
          straight to your inbox.</span
        >
      </div>
      <div
        class="w-full h-full flex flex-col primary-card p-2 item-card gap-4 zoom-effect"
      >
        <div
          class="border border-[#3e4a56] hover:border-[#FFFFFF] rounded-full block p-2 w-[40px] h-[40px] text-center justify-center items-center"
        >
          <span class="pi pi-comments"></span>
        </div>
        <span class="font-bold text-xl item-title span-primary-hover">
          Career Guidance and Counseling
        </span>
        <span class="item-content text-justify"
          >Receive expert advice and counseling to navigate your career path
          successfully.</span
        >
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

.item-title {
  font-family: "Montserrat", serif;
  font-optical-sizing: auto;
  font-weight: 700;
  font-style: normal;
}

.item-content {
  font-family: "Montserrat", serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
}

.item-card {
  // background: rgb(164, 255, 253);
  background-color: aliceblue;
  color: #3e4a56;

  &:hover {
    background: linear-gradient(
      135deg,
      rgb(0, 78, 76) 80%,
      hsla(0, 0%, 100%, 1) 100%
    );
    transition: ease-out 0.5s;
    color: #ffffff;
  }
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
</style>
