<script lang="ts" setup>
import { useForm } from "vee-validate";
import type { UserEntity } from "~/entities/user/user";
import { userCreatePostSchema } from "~/schemas/user/post.schema";
import { userStore } from "~/stores/user/user";
import CImageUploadV1 from "~/components/common/CImageUploadV1.vue";
import type { DataPostEntity, HashtagEntity } from "~/entities/user/post";
import { DEFAULT_AVATAR_URL } from "~/constants/common";

const props = defineProps({
  user: {
    type: Object as PropType<UserEntity>,
  },
});
const store = userStore();
const isLoading = computed(() => store.isLoading);
const isSucceed = computed(() => store.isSucceed);
const hashtags = computed(() => store.hashtags);
const visible = ref<boolean>(false);

const hashtagOptionSelected = ref<HashtagEntity[]>([]);

const { handleSubmit, defineField, errors, resetForm } = useForm({
  validationSchema: userCreatePostSchema,
});

const [title] = defineField("title");
const [description] = defineField("description");
const postUpdate = ref();
const mediaFile = ref<File>();
onMounted(async () => {
  await store.getHashtagList({});
});

const handleRemoveFile = () => {
  postUpdate.value = "";
};

const handleGetFile = (data: File) => {
  mediaFile.value = data;
  console.log(mediaFile.value);
};

const onSubmit = handleSubmit(async () => {
  const postEntity: DataPostEntity = {
    title: title.value,
    description: description.value,
    hashtag: hashtagOptionSelected.value.map((_) => _.name) ?? [],
    media_file: mediaFile.value,
  };

  await store.createPost(postEntity);

  if (!isLoading.value && isSucceed.value) {
    toastSuccess("Success", "Posted");
    resetForm();
    visible.value = false;
  }
});
</script>
<template>
  <div class="primary-card w-full p-2">
    <div class="w-full flex justify-between gap-2 items-center">
      <img
        :src="props.user?.avatar"
        alt=""
        class="w-[50px] h-[50px] rounded-full"
      />
      <CommonKTAInput
        class="w-full rounded-2xl"
        placeholder="Discovery many great hire by your post"
        @focus="visible = true"
      />
    </div>
    <Dialog
      v-model:visible="visible"
      modal
      header="Create post"
      :style="{ width: '75rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <form class="flex flex-col gap-2">
        <CommonValidate label="Title" :error="errors.title" required>
          <CommonKTAInput v-model="title" class="w-full" />
        </CommonValidate>
        <CommonValidate
          label="Description"
          :error="errors.description"
          required
        >
          <CommonKTATextArea
            v-model="description"
            class="w-full min-h-[150px] font-bold container-group-input"
          />
        </CommonValidate>
        <CImageUploadV1
          :default-img-value="DEFAULT_AVATAR_URL"
          label="Thumbnail"
          name="logo"
          class="text-sm"
          :max-size="5"
          @handle-remove-file="handleRemoveFile"
          @handle-transfer-file="handleGetFile"
        />
        <div class="flex flex-col gap-1">
          <label for="hashtag">Hashtag</label>
          <MultiSelect
            v-model="hashtagOptionSelected"
            :options="hashtags"
            option-label="name"
            filter
            class="w-full border"
          />
        </div>
        <div class="flex justify-end gap-2">
          <Button
            label="Cancel"
            severity="secondary"
            class="primary-button !w-[80px] !h-[40px]"
            @click="visible = false"
          ></Button>
          <Button
            label="Post"
            class="primary-button !w-[80px] !h-[40px]"
            @click="onSubmit"
          ></Button>
        </div>
      </form>
    </Dialog>
  </div>
</template>
<style lang="scss" scoped>
.menu-item {
  &:hover {
    border-color: #11b9b5;
    border-width: 2px;
  }
}
</style>
