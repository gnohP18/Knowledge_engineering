<script setup lang="ts">
import { DEFAULT_FILE_URL, FILE_ACCEPT_TYPE } from "~/constants/common";

const props = defineProps({
  maximumFile: {
    type: Number,
    default: 1,
  },
  defaultFileShowUrl: {
    type: String,
    default: DEFAULT_FILE_URL,
  },
  acceptType: {
    type: String,
    default: FILE_ACCEPT_TYPE,
  },
});

const emits = defineEmits(["upload"]);
const files = ref<File[]>([]);

const onRemoveTemplatingFile = (
  removeFileCallback: (i: number) => void,
  index: number,
) => {
  removeFileCallback(index);
};

const onClearTemplatingUpload = (clear: () => void) => {
  clear();
};

const onSelectedFiles = (event: Event) => {
  files.value = event.files;
};

const uploadEvent = () => {
  emits("upload", files.value);
};

const onTemplatedUpload = () => {
  console.log(files.value);
};
</script>
<template>
  <div class="card">
    <Toast />
    <FileUpload
      v-bind="$attrs"
      @upload="onTemplatedUpload($event)"
      :multiple="props.maximumFile > 1 ? true : false"
      :accept="FILE_ACCEPT_TYPE"
      :file-limit="props.maximumFile"
      @select="($event) => onSelectedFiles($event)"
    >
      <template
        #header="{ chooseCallback, uploadCallback, clearCallback, files }"
      >
        <div class="flex flex-wrap justify-between items-center flex-1 gap-2">
          <div class="flex gap-2">
            <Button
              @click="chooseCallback()"
              icon="pi pi-file"
              rounded
              outlined
            ></Button>
            <Button
              @click="uploadEvent()"
              icon="pi pi-cloud-upload"
              rounded
              outlined
              severity="success"
              :disabled="!files || files.length === 0"
            ></Button>
            <Button
              @click="clearCallback()"
              icon="pi pi-times"
              rounded
              outlined
              severity="danger"
              :disabled="!files || files.length === 0"
            ></Button>
          </div>
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
        <div v-if="files.length > 0">
          <h5>Pending</h5>
          <div class="flex flex-wrap p-0 sm:p-5 gap-5">
            <div
              v-for="(file, index) of files"
              :key="file.name + file.type + file.size"
              class="card m-0 px-6 flex flex-column border-1 items-center gap-3"
            >
              <img
                role="presentation"
                :alt="file.name"
                :src="props.defaultFileShowUrl"
                class="common-rounded"
                width="50"
                height="50"
              />
              <span class="font-semibold">{{ file.name }}</span>
              <Badge value="Pending" severity="warning" />
              <Button
                icon="pi pi-times"
                @click="onRemoveTemplatingFile(removeFileCallback, index)"
                outlined
                rounded
                severity="danger"
              />
            </div>
          </div>
        </div>

        <div v-if="uploadedFiles.length > 0">
          <h5>Completed</h5>
          <div class="flex flex-wrap p-0 sm:p-5 gap-5">
            <div
              v-for="(file, index) of uploadedFiles"
              :key="file.name + file.type + file.size"
              class="primary-card m-0 px-6 flex flex-col border-1 border items-center gap-3"
            >
              <div>
                <img
                  role="presentation"
                  :alt="file.name"
                  :src="file.objectURL"
                  width="100"
                  height="50"
                />
              </div>
              <span class="font-semibold">{{ file.name }}</span>
              <Button
                icon="pi pi-times"
                @click="removeUploadedFileCallback(index)"
                outlined
                rounded
                severity="danger"
              />
            </div>
          </div>
        </div>
      </template>
      <template #empty>
        <div
          class="flex items-center justify-center flex-column gap-2 border border-dashed common-rounded p-2"
        >
          <i class="pi pi-cloud-upload text-4xl" />
          <p>Drag and drop files to here to upload.</p>
        </div>
      </template>
    </FileUpload>
  </div>
</template>
