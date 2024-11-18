<script lang="ts" setup>
const images = [
  "/images/landingPage/carousel_1.png",
  "/images/landingPage/carousel_2.png",
  "/images/landingPage/carousel_3.png",
];
</script>
<template>
  <section
    class="grid grid-cols-1 md:grid-cols-2 items-center justify-center background-default-135deg animation-visible"
  >
    <div class="w-full flex flex-col gap-y-4 justify-end montserrat-font-500">
      <span class="text-6xl text-end">Unlock Your</span>
      <div class="flex justify-end w-full gap-x-2">
        <span
          class="text-6xl flex-1 text-end background-color-reserve landing-page-span-text"
          >Dream</span
        >
        <span class="text-6xl text-start">Career</span>
      </div>
      <div class="flex justify-end w-full gap-x-2">
        <span class="text-6xl text-end">With</span>
        <span class="text-6xl text-start text-color-gradient">Job Finding</span>
      </div>
      <div class="w-full flex justify-end">
        <span class="w-full md:w-[50%] font-normal secondary-text text-end"
          >Discover Opportunities, Connect with Employers, and Take the Next
          Step Towards Fulfilling Work Life</span
        >
      </div>
    </div>
    <div class="hidden w-full md:flex items-center">
      <Carousel
        :value="images"
        :numVisible="1"
        :numScroll="1"
        class="md:w-2/3 xl:w-[60%] h-full flex items-center justify-center"
        circular
        :autoplayInterval="3000"
        :showNavigators="false"
      >
        <template #item="slotProps">
          <div
            class="w-full h-full flex justify-center items-center p-3 rounded-md"
          >
            <img
              :src="slotProps.data"
              class="w-full h-full object-cover rounded-md"
            />
          </div>
        </template>
      </Carousel>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.landing-page-span-text {
  color: white;

  &:hover {
    color: #073635;
    transition: ease-out 0.5s;
  }
}

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
</style>
