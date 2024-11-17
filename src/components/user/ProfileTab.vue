<script lang="ts" setup>
import { get } from "lodash-es";
import type { UserEntity } from "~/entities/user/user";
import KTAInput from "../common/KTAInput.vue";
import Validate from "../common/Validate.vue";
import CImageUploadV1 from "../common/CImageUploadV1.vue";
import KTACalendar from "../common/KTACalendar.vue";
import KTADropdown from "../common/KTADropdown.vue";
import KTATextArea from "../common/KTATextArea.vue";
import { HASHTAG_EXAMPLE } from "~/constants/sample";
import { useForm } from "vee-validate";
import { userUpdateSchema } from "~/schemas/user/profile.schema";
import type { OptionSelect } from "~/entities/common";
import { userStore } from "~/stores/user/user";
import { DEFAULT_AVATAR_URL } from "~/constants/common";

const props = defineProps({
  user: {
    type: Object as PropType<UserEntity>,
  },
});

const userStageStore = userStore();
const isLoading = computed(() => userStageStore.isLoading);
const isSucceed = computed(() => userStageStore.isSucceed);
const jobPositions = computed(() => userStageStore.positions);

const genderOption = [
  { name: "Male", id: 0 },
  { name: "Female", id: 1 },
];

const { errors, defineField, setFieldValue, handleSubmit } = useForm({
  validationSchema: userUpdateSchema,
});

const [firstName] = defineField("first_name");
const [lastName] = defineField("last_name");
const [dateOfBirth] = defineField("date_of_birth");
const dateOfBirthSelected = ref<Date>();

const [address] = defineField("address");
const [detailAddress] = defineField("detail_address");
const [email] = defineField("email");
const [jobPosition] = defineField("job_position");
const jobPositionSelected = ref<OptionSelect>(jobPositions.value[0]);
const [selfIntroduce] = defineField("self_introduce");
const [lifeGoal] = defineField("life_goal");
const [gender] = defineField("gender");
const [avatar] = defineField("avatar");

// const handleRemoveFile = () => {
//  user.value.avatar = "";
// };
const selectedGender = ref<OptionSelect>({ name: "Male", id: 0 });

onMounted(() => {
  setFieldValue("first_name", get(props.user, "first_name", ""));
  setFieldValue("last_name", get(props.user, "last_name", ""));
  setFieldValue("date_of_birth", get(props.user, "date_of_birth", ""));
  dateOfBirthSelected.value = new Date(dateOfBirth.value);
  setFieldValue("address", get(props.user, "address", ""));
  setFieldValue("detail_address", get(props.user, "detail_address", ""));
  setFieldValue("email", get(props.user, "email", ""));
  setFieldValue("self_introduce", get(props.user, "self_introduce", ""));
  setFieldValue("life_goal", get(props.user, "life_goal", ""));
  setFieldValue("avatar", get(props.user, "avatar", ""));
  setFieldValue("job_position", get(props.user, "job_position.id", 0));
  setFieldValue("gender", get(props.user, "gender", 0));
  setFieldValue("avatar", get(props.user, "avatar", ""));

  selectedGender.value = genderOption.filter(
    (_) => props.user?.gender === _.id,
  )[0];

  jobPositionSelected.value =
    jobPositions.value.filter((_) => _.id === jobPosition.value)[0] ??
    jobPositions.value[0];
});

const selectedHashtag = ref([
  { code: "1", name: "Back End" },
  { code: "2", name: "Front End" },
  { code: "3", name: "DevOps" },
  { code: "4", name: "Project Management" },
  { code: "5", name: "Data Analysis" },
]);

const changeGender = () => {
  gender.value = selectedGender.value.id;
};

const changeDateOfBirth = () => {
  dateOfBirth.value = dateOfBirthSelected.value?.toDateString();
};

const mediaFile = ref<File>();
const handleGetFile = (data: File) => {
  mediaFile.value = data;
  avatar.value = data.objectURL;
};

const handleRemoveFile = () => {
  avatar.value = DEFAULT_AVATAR_URL;
};

const onSubmit = handleSubmit(async () => {
  const formData = new FormData();
  formData.append("first_name", firstName.value ?? "");
  formData.append("last_name", lastName.value ?? "");
  formData.append("date_of_birth", dateOfBirth.value ?? "");
  formData.append("email", email.value ?? "");
  formData.append("address", address.value ?? "");
  formData.append("detail_address", detailAddress.value ?? "");
  formData.append("is_married", "true");
  formData.append("gender", String(selectedGender.value.id ?? 1));
  formData.append("self_introduce", selfIntroduce.value ?? "");
  formData.append("life_goal", lifeGoal.value ?? "");
  formData.append("job_position", String(jobPosition.value ?? 0));
  if (avatar.value !== DEFAULT_AVATAR_URL) {
    formData.append("avatar", mediaFile.value);
  }

  await userStageStore.updateProfile(formData);
  if (!isLoading.value && isSucceed.value) {
    await userStageStore.getIndexProfile({ limit: 100 });
  }
});
</script>
<template>
  <form
    v-if="props.user"
    @submit.prevent="onSubmit"
    class="flex flex-col w-full p-3 gap-x-4"
  >
    <div class="container-group-input w-full md:columns-2">
      <Validate label="First name" :error="errors.first_name" required>
        <KTAInput v-model="firstName" :class="'w-full'" />
      </Validate>
      <Validate label="Last name" :error="errors.last_name" required>
        <KTAInput v-model="lastName" :class="'w-full'" />
      </Validate>
    </div>
    <div class="container-group-input w-full md:columns-2">
      <Validate label="Date of birth" :error="errors.date_of_birth" required>
        <KTACalendar
          :class="'w-full'"
          v-model="dateOfBirthSelected"
          date-format="yy-mm-dd"
          @change="changeDateOfBirth"
        />
      </Validate>
      <KTADropdown
        label="Gender"
        :class="'w-full'"
        v-model="selectedGender"
        :options="genderOption"
        @change="changeGender"
        option-label="name"
      />
    </div>
    <div class="container-group-input w-full md:columns-2">
      <Validate label="Address" :error="errors.address" required>
        <KTAInput v-model="address" :class="'w-full'" />
      </Validate>
      <Validate label="Detail address" :error="errors.detail_address" required>
        <KTAInput v-model="detailAddress" :class="'w-full'" />
      </Validate>
    </div>
    <div class="container-group-input w-full md:columns-2">
      <div class="flex items-center">
        <Checkbox v-model="props.user.is_married" :binary="true" />
        <label for="is_married" class="ml-2"> Is married </label>
      </div>
    </div>
    <div class="container-group-input w-full">
      <CImageUploadV1
        :default-img-value="avatar ?? DEFAULT_AVATAR_URL"
        label="Avatar"
        name="logo"
        class="text-sm"
        :max-size="5"
        :error="errors.avatar ?? ''"
        @handle-remove-file="handleRemoveFile"
        @handle-transfer-file="handleGetFile"
      />
    </div>
    <div class="container-group-input w-full md:columns-2">
      <Validate label="Email" :error="errors.email" required>
        <KTAInput v-model="email" :class="'w-full'" />
      </Validate>
      <Validate label="Job Position" :error="errors.job_position">
        <KTADropdown
          v-if="jobPositions"
          v-model="jobPositionSelected"
          :options="jobPositions"
          filter
          option-label="name"
          :class="'w-full'"
        />
      </Validate>
    </div>
    <div class="card flex justify-center flex-col container-group-input">
      <label class="text-sm font-bold"> #Hashtag Skill</label>
      <MultiSelect
        v-model="selectedHashtag"
        :options="HASHTAG_EXAMPLE"
        filter
        optionLabel="name"
        placeholder="Select Hashtag"
        :maxSelectedLabels="10"
        class="w-full border"
      />
    </div>
    <Validate label="Self introduction" :error="errors.self_introduce">
      <KTATextArea
        v-model="selfIntroduce"
        class="w-full min-h-[150px] container-group-input"
      />
    </Validate>
    <Validate label="Life goal" :error="errors.self_introduce">
      <KTATextArea
        v-model="lifeGoal"
        class="w-full min-h-[150px] container-group-input"
      />
    </Validate>
    <div class="w-full flex justify-end px-2 py-4">
      <Button
        label="Save"
        type="submit"
        class="custom-button w-[80px] h-[40px]"
      />
    </div>
  </form>
</template>
<style lang="scss" scoped>
.menu-item {
  &:hover {
    border-color: #11b9b5;
    border-width: 2px;
  }
}

.area-input-container {
  width: 100%;
  min-height: 150px;
}

.container-group-input {
  border: 1px solid white;
  padding: 16px 8px 16px 8px;
  gap: 8px;

  &:hover {
    border: 1px dashed #bfc4cd;
    border-radius: 10px;
  }
}
</style>
