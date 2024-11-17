<script setup lang="ts">
import { IMAGE_ACCEPT_TYPE } from "~/constants/common";
import KTALoadingAction from "../common/KTALoading.vue";
interface Props {
  label?: string;
  required?: boolean;
  error: string;
  defaultImgValue?: string;
  maxSize?: number; // Mb,
  hint?: string;
  acceptType?: string;
}

const props = defineProps<Props>();
const emit = defineEmits([
  "handleSelectFile",
  "handleRemoveFile",
  "handleTransferFile",
]);
const { label, required, error, defaultImgValue, maxSize } = toRefs(props);
const filesSelect = ref(null);
const imageAcceptTypes = "image/jpg,image/jpeg,image/gif,image/png";
const fileUploadRef = ref();
const eventHintUpload = ref();
const isShowHintUpload = ref(false);
const isLoading = ref(false);

const showHintUpload = (event) => {
  eventHintUpload.value = event;
  isShowHintUpload.value = true;
};

const onRemoveTemplatingFile = (file, removeFileCallback, index) => {
  emit("handleRemoveFile");

  removeFileCallback(index);
};

const handleSelect = async (data: any) => {
  const fileUploadedSize = Number(data.files[0].size) / 1024; // Convert Bytes to KB
  const maxSizeUpload = Number(maxSize.value) * 1024; // Convert MB to KB

  if (fileUploadedSize > maxSizeUpload) {
    emit("handleRemoveFile");
  } else {
    isLoading.value = true;

    // Remove first file when upload more than 1
    fileUploadRef.value?.files?.length > 1 && fileUploadRef.value.files.shift();
    const formData = new FormData();

    formData.append("file", data.files[0]);

    // const upload = await callApiUploadImage(formData);

    // emit("handleSelectFile", upload?.id);
    emit("handleTransferFile", data.files[0]);

    isLoading.value = false;
  }
};

const uploadedFiles = () => {};
const removeUploadedFileCallback = () => {};
</script>

<template>
  <div class="flex flex-col w-full">
    <KTALoadingAction v-if="isLoading" overlay />
    <label for="file-upload" class="text-sm flex items-center gap-2 mb-3">
      <h6 class="text-sm mb-0">{{ props.label }}</h6>
      <strong v-if="props.required" class="text-red-500">*</strong>
      <span
        v-if="props.hint"
        class="ml-1 pi pi-question-circle"
        @click="showHintUpload"
      />
    </label>
    <div class="flex w-full gap-4 justify-center items-center">
      <FileUpload
        ref="fileUploadRef"
        v-bind="$attrs"
        class="mt-2 bg-neutrals-1"
        :show-upload-button="false"
        :show-cancel-button="false"
        :file-limit="1"
        :accept="props.acceptType ?? IMAGE_ACCEPT_TYPE"
        @select="handleSelect"
      >
        <template #header="{ chooseCallback, files }">
          <div class="flex flex-col gap-4 p-5">
            <Button
              :disabled="filesSelect?.files?.length > 0"
              icon="pi pi-upload w-2"
              :label="'Upload avatar'"
              class="p-button--secondary px-4 bg-neutral-100 rounded-lg shadow justify-center items-center gap-1 inline-flex"
              @click="chooseCallback()"
            />
            <p
              class="text-slate-500 text-sm font-normal font-['Noto Sans JP'] leading-normal tracking-tight"
            >
              Max size 5mb
            </p>
          </div>
        </template>
        <template
          #content="{
            files,
            uploadedFiles,
            removeUploadedFileCallback,
            removeFileCallback,
          }"
        >
          <div class="upload-wrapper">
            <div class="upload-wrapper__thumbnail">
              <img
                v-if="files.length > 0"
                :alt="files[0].name"
                :src="files[0].objectURL"
                class="object-contain"
              />
              <img
                v-else
                class="shadow-[0_0px_4px_1px_rgba(0,0,0,0.3)] object-contain"
                :alt="defaultImgValue ?? ''"
                :src="defaultImgValue ?? '/images/default.png'"
              />

              <Button
                v-if="files.length > 0 || defaultImgValue !== null"
                icon="pi pi-times"
                class="upload-icon-remove shadow-sm"
                @click="onRemoveTemplatingFile(file, removeFileCallback, index)"
              />
            </div>
          </div>
        </template>
      </FileUpload>
    </div>
    <small v-show="error" class="error-file p-error">{{ error }}</small>
  </div>
</template>

<style lang="scss" scoped>
img {
  border-radius: 15px;
  width: 150px;
  height: 150px;
}

.p-fileupload {
  @apply flex flex-row-reverse items-center justify-end w-full;

  :deep(.p-fileupload-content) {
    @apply flex justify-center items-center w-[200px] rounded-2xl border-dashed border-[#d9d9d9] bg-[#f7f7f7];
    border-radius: 16px;
    border: 1px dashed #d9d9d9;
    background-color: rgba($color: #f7f7f7, $alpha: 0.9);
  }

  :deep(.p-fileupload-highlight) {
    @apply border-dashed border-2 border-[#11B9B5] rounded-xl;
  }
}

.p-fileupload-buttonbar {
  height: 46px;
}

.p-button {
  height: 46px;
}

.p-fileupload-file-details {
  display: none;
}

.upload-wrapper {
  @apply w-full p-5 contents items-center;

  &__thumbnail {
    width: 150px;
    margin: auto;
    position: relative;

    img {
      width: 100%;
    }

    .upload-icon-remove {
      visibility: visible;
      position: absolute;
      top: 5px;
      right: 4px;
      z-index: 10;
      cursor: pointer;
      padding: 0;
      color: #d11d1d;
      font-size: 3rem;
      line-height: normal;
      height: 25px;
      width: 25px;
      border-radius: 50%;
      background-color: #ffffff;
      border: none;

      span.p-button-icon.pi.pi-times {
        font-size: 10px;
      }
    }
  }
}

.error-file {
  font-size: 1rem;
}

.border-upload-box {
  border-radius: var(--rounded-large, 16px);
  border: 1px dashed var(--Stroke-1, #d9d9d9);
  background: var(--Background-3, #f7f7f7);
}
</style>
