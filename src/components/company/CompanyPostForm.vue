<script lang="ts" setup>
import { get } from "lodash-es";
import type { PropType } from "vue";
import { MAXIMUM_HASHTAG, MODE_FORM_CREATE } from "~/constants/common";
import type { PostEntity } from "~/entities/company/post";
import Validate from "../common/Validate.vue";
import { useForm } from "vee-validate";
import { companyPostSchema } from "~/schemas";
import KTAInput from "../common/KTAInput.vue";
import KTATextArea from "../common/KTATextArea.vue";
import KTADropdown from "../common/KTADropdown.vue";
import CImageUploadV1 from "../common/CImageUploadV1.vue";
import { POST_STATUS_OPTIONS } from "~/constants/post";
import type { OptionSelect } from "~/entities/common";
import { DEFAULT_FILE_URL } from "~/constants/common";
const props = defineProps({
  mode: {
    type: String,
    default: MODE_FORM_CREATE,
  },
  post: {
    type: Object as PropType<PostEntity>,
    default: {},
  },
  hashtags: {
    type: Array as PropType<String[]>,
  },
});

const { defineField, setFieldValue, handleSubmit, errors } = useForm({
  validationSchema: companyPostSchema,
});

const [title] = defineField("title");
const [description] = defineField("description");
const [status] = defineField("status");
const [hashtags] = defineField("hashtags");
const mediaFileUrl = ref<string>(DEFAULT_FILE_URL);
const statusOptionSelected = ref<OptionSelect>(POST_STATUS_OPTIONS[0]);
const hashtagOptionSelected = ref<{ id: string; name: string }[]>([]);

const hashtagOptions = computed(() => {
  return props.hashtags?.map((hashtag) => {
    return {
      id: String(hashtag),
      name: `#${hashtag}`,
    };
  });
});

onMounted(() => {
  initFromData();
});

const initFromData = () => {
  if (props.mode === MODE_FORM_CREATE) {
  } else {
    setFieldValue("title", get(props.post, "title", ""));
    setFieldValue("status", get(props.post, "status", 0));
    setFieldValue("description", get(props.post, "description", ""));
    setFieldValue("hashtags", get(props.post, "hashtags", []));

    statusOptionSelected.value =
      POST_STATUS_OPTIONS.filter((_) => _.id === status.value)[0] ??
      POST_STATUS_OPTIONS[0];

    hashtagOptionSelected.value =
      hashtagOptions.value?.filter((hashtag) =>
        hashtags.value?.includes(hashtag.id),
      ) ?? [];

    mediaFileUrl.value = get(props.post, "media_file", "");
  }
};

const changeStatus = () => {
  status.value = statusOptionSelected.value.id;
};

const handleRemoveFile = () => {
  mediaFileUrl.value = DEFAULT_FILE_URL;
};

const mediaFile = ref<File>();
const handleTransferFile = (file: File) => {
  mediaFile.value = file;
};
const onSubmit = handleSubmit(async () => {});
</script>
<template>
  <form class="flex flex-col gap-2">
    <div class="grid grid-cols-2 gap-2">
      <Validate label="Title" :error="errors.title" class="w-full">
        <KTAInput v-model="title" class="w-full" />
      </Validate>
      <Validate :error="errors.status" label="Company type" class="w-full">
        <KTADropdown
          v-model="statusOptionSelected"
          :options="POST_STATUS_OPTIONS"
          option-label="name"
          class="w-full"
          @change="changeStatus"
        />
      </Validate>
    </div>
    <Validate label="Description" :error="errors.description" class="w-full">
      <KTATextArea v-model="description" class="w-full min-h-[250px]" />
    </Validate>
    <CImageUploadV1
      :default-img-value="props.post.media_file"
      label="Logo"
      name="logo"
      class="text-sm"
      :max-size="5"
      :error="''"
      @handle-remove-file="handleRemoveFile"
      @handle-transfer-file="handleTransferFile"
    />
    <Validate label="Hashtag" :error="errors.hashtags">
      <MultiSelect
        v-model="hashtagOptionSelected"
        display="chip"
        :options="hashtagOptions"
        optionLabel="name"
        filter
        placeholder="Select at least 1 and maximum 10 Hashtag"
        :maxSelectedLabels="MAXIMUM_HASHTAG"
        class="w-full"
      />
    </Validate>
  </form>
</template>
<style lang="scss" scoped>
:deep(.p-multiselect-label) {
  display: flex;
  flex-direction: column;
  gap: 4px;

  .p-multiselect-token {
    display: block;
    width: fit-content;
  }
}
</style>
