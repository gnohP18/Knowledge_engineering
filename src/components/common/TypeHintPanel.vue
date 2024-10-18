<script lang="ts" setup>
const props = defineProps({
  event: {
    type: Object,
    default: () => {},
  },
  isShow: {
    type: Boolean,
    default: false,
  },
  message: {
    type: String,
    default: "",
  },
  translate: {
    type: Boolean,
    default: false,
  },
});

const op = ref();
const msgData = ref("");

const handleTranslateMsg = async () => {
  msgData.value = props.translate
    ? await translateHTMLContent(props.message)
    : props.message;
};

watch(
  () => props.event,
  (newValue) => {
    op.value.toggle(newValue);
  },
);

watchEffect(() => {
  handleTranslateMsg();
});
</script>

<template>
  <OverlayPanel
    ref="op"
    class="border-2 shadow-2xl"
    style="max-width: 60vw; height: auto"
  >
    <div v-dompurify-html="msgData" class="grid" />
  </OverlayPanel>
</template>

<style lang="scss" scoped>
.p-overlaypanel .p-overlaypanel-content {
  padding: 1rem 1.25rem;
  border: 1px solid #777e90;
}

.price-text {
  color: #777e90;
}

.sale-price-text {
  color: #0d9490;
  font-size: 20px;
  font-weight: bold;
}
</style>
