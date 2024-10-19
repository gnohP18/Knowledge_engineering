<script lang="ts" setup>
import type { UserEntity } from "~/entities/user/user";
import KTAInput from "../common/KTAInput.vue";
import CImageUploadV1 from "../common/CImageUploadV1.vue";
import KTACalendar from "../common/KTACalendar.vue";
import KTADropdown from "../common/KTADropdown.vue";
import KTATextArea from "../common/KTATextArea.vue";
import { HASHTAG_EXAMPLE } from "~/constants/sample";
import KTAButton from "../common/KTAButton.vue";

const genderOption = ref([
  { name: "Male", code: "male" },
  { name: "Female", code: "female" },
]);

const user = ref<UserEntity>({
  id: "1",
  last_name: "phong",
  first_name: "nguyen hoang",
  date_of_birth: "2002/18/04",
  avatar: "/images/avatar_2.jpg",
  email: "nhphong1804@gmail.com",
  address: "Da Nang",
  detail_address: "Lien Chieu",
  is_married: false,
  gender: "male",
  self_introduce: "I'm currently student in Da Nang University of technology",
  life_goal: "Become a solution architeccture",
  job_title: "Backend developer",
  hashtag: [1, 2, 3, 6, 8, 9],
  connect_company: [],
  connect_user: [],
});

const handleRemoveFile = () => {
  user.value.avatar = "";
};

const selectedGender = { name: "Male", code: "male" };
const selectedHashtag = ref([
  { code: "1", name: "Back End" },
  { code: "2", name: "Front End" },
  { code: "3", name: "DevOps" },
  { code: "4", name: "Project Management" },
  { code: "5", name: "Data Analysis" },
]);
</script>
<template>
  <div class="flex flex-col w-full p-3 gap-x-4">
    <div class="container-group-input w-full columns-2">
      <KTAInput
        v-model="user.first_name"
        :label="'First name'"
        required
        :validate-message="'Invalid first name'"
        :class="'w-full'"
      />
      <KTAInput
        v-model="user.last_name"
        :label="'Last name'"
        required
        :validate-message="'Invalid last name'"
        :class="'w-full'"
      />
    </div>
    <div class="container-group-input w-full columns-2">
      <KTACalendar
        :label="'Date of birth'"
        :class="'w-full'"
        v-model="user.date_of_birth"
      />
      <KTADropdown
        label="Gender"
        :class="'w-full'"
        v-model="selectedGender"
        :options="genderOption"
        option-label="name"
      />
    </div>
    <div class="container-group-input w-full columns-2">
      <KTAInput
        v-model="user.address"
        label="Address"
        required
        :validate-message="'Invalid address'"
        :class="'w-full'"
      />
      <KTAInput
        v-model="user.detail_address"
        label="Detail address"
        required
        :validate-message="'Invalid detail address'"
        :class="'w-full'"
      />
    </div>
    <div class="container-group-input w-full columns-2">
      <div class="flex items-center">
        <Checkbox v-model="user.is_married" :binary="true" />
        <label for="is_married" class="ml-2"> Is married </label>
      </div>
    </div>
    <div class="container-group-input w-full">
      <CImageUploadV1
        :default-img-value="user.avatar"
        label="Avatar"
        name="logo"
        class="text-sm"
        :max-size="5"
        @handle-remove-file="handleRemoveFile"
      />
    </div>
    <div class="container-group-input w-full columns-2">
      <KTAInput
        v-model="user.email"
        label="Email"
        required
        validate-message="Invalid Email"
        :class="'w-full'"
      />
      <KTAInput
        v-model="user.job_title"
        label="Job title"
        required
        :validate-message="'Invalid detail address'"
        :class="'w-full'"
      />
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
    <KTATextArea
      label="Self introduction"
      v-model="user.self_introduce"
      class="w-full min-h-[150px] font-bold container-group-input"
    />
    <KTATextArea
      label="Life goal"
      v-model="user.life_goal"
      class="w-full min-h-[150px] font-bold container-group-input"
    />
    <div class="w-full flex justify-end px-2 py-4">
      <KTAButton label="Save" />
    </div>
  </div>
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
  font-weight: bold;
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
