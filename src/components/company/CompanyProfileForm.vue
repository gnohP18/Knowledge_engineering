<script setup lang="ts">
import { get } from "lodash-es";
import { AuthStore } from "~/stores/company/auth";
import Validate from "../common/Validate.vue";
import { useForm } from "vee-validate";
import { companyUpdateSchema } from "~/schemas";
import type { CompanyEntity } from "~/entities/company/company";
import { DEFAULT_AVATAR_URL, MODE_FORM_CREATE } from "~/constants/common";
import KTAInput from "../common/KTAInput.vue";
import KTAInputNumber from "../common/KTAInputNumber.vue";
import KTATextArea from "../common/KTATextArea.vue";
import KTADropdown from "../common/KTADropdown.vue";
import CImageUploadV1 from "../common/CImageUploadV1.vue";
import type { OptionSelect } from "~/entities/common";
import {
  COMPANY_TYPE_OPTIONS,
  COMPANY_WORKPLACE_OPTIONS,
} from "~/constants/company";

const props = defineProps({
  profile: {
    type: Object as PropType<CompanyEntity>,
  },
  mode: {
    type: String,
    default: MODE_FORM_CREATE,
  },
});

const emits = defineEmits(["submit"]);

/**
 * Option static
 */

/**
 * Validation variable
 */
const { defineField, setFieldValue, resetForm, errors, handleSubmit } = useForm(
  {
    validationSchema: companyUpdateSchema,
  },
);

const [name] = defineField("name");
const [nameInCharge] = defineField("name_in_charge");
const [note] = defineField("note");
const [phone] = defineField("phone");
const [email] = defineField("email");
const [logo] = defineField("logo");
const [companyType] = defineField("company_type");
const companyTypeSelected = ref<OptionSelect>(COMPANY_TYPE_OPTIONS[0]);
const [size] = defineField("size");
const [address] = defineField("address");
const [detailAddress] = defineField("detail_address");
const [accessibility] = defineField("accessibility");
const [closedDay] = defineField("closed_day");
const [businessDay] = defineField("business_day");
const [workplace] = defineField("workplace");
const workplaceSelected = ref<OptionSelect>(COMPANY_WORKPLACE_OPTIONS[0]);

const companyAuthStore = AuthStore();
const isLoading = computed(() => companyAuthStore.isLoading);
const isSucceed = computed(() => companyAuthStore.isSucceed);

onMounted(async () => {
  initForm();
});

const initForm = () => {
  if (props.mode === MODE_FORM_CREATE) {
  } else {
    setFieldValue("name", get(props.profile, "name", ""));
    setFieldValue("name_in_charge", get(props.profile, "name_in_charge", ""));
    setFieldValue("note", get(props.profile, "note", ""));
    setFieldValue("phone", get(props.profile, "phone", ""));
    setFieldValue("company_type", get(props.profile, "company_type", 0));
    setFieldValue("email", get(props.profile, "email", ""));
    setFieldValue("logo", get(props.profile, "logo", ""));
    setFieldValue("size", get(props.profile, "size", 0));
    setFieldValue("address", get(props.profile, "address", ""));
    setFieldValue("detail_address", get(props.profile, "detail_address", ""));
    setFieldValue("accessibility", get(props.profile, "accessibility", ""));
    setFieldValue("closed_day", get(props.profile, "closed_day", ""));
    setFieldValue("business_day", get(props.profile, "business_day", ""));
    setFieldValue("workplace", get(props.profile, "workplace", 1));

    companyTypeSelected.value =
      COMPANY_TYPE_OPTIONS.filter((_) => _.id === companyType.value)[0] ??
      COMPANY_TYPE_OPTIONS[0];

    workplaceSelected.value =
      COMPANY_WORKPLACE_OPTIONS.filter((_) => _.id === workplace.value)[0] ??
      COMPANY_WORKPLACE_OPTIONS[0];
  }
};

const changeCompanyType = () => {
  companyType.value = companyTypeSelected.value.id;
};

const changeWorkplace = () => {
  workplace.value = workplaceSelected.value.id;
};

const handleRemoveFile = () => {
  logo.value = DEFAULT_AVATAR_URL;
};

const mediaFile = ref<File>();
const handleTransferFile = (file: File) => {
  mediaFile.value = file;
};

const onSubmit = handleSubmit(async () => {
  const form = new FormData();
  if (name.value) {
    form.append("name", name.value);
  }
  if (nameInCharge.value) {
    form.append("name_in_charge", nameInCharge.value);
  }
  if (companyType.value) {
    form.append("company_type", String(companyType.value));
  }
  if (size.value) {
    form.append("size", String(size.value));
  }
  if (email.value) {
    form.append("email", email.value);
  }
  if (phone.value) {
    form.append("phone", phone.value);
  }
  if (address.value) {
    form.append("address", address.value);
  }
  if (detailAddress.value) {
    form.append("detail_address", detailAddress.value);
  }
  if (businessDay.value) {
    form.append("business_day", businessDay.value);
  }
  if (workplace.value) {
    form.append("workplace", String(workplace.value));
  }
  if (accessibility.value) {
    form.append("accessibility", accessibility.value);
  }
  if (note.value) {
    form.append("note", note.value);
  }
  if (mediaFile.value) {
    form.append("logo", mediaFile.value);
  }
  emits("submit", form);
});
</script>
<template>
  <form>
    <div class="flex flex-col">
      <div class="container-group-input flex flex-col md:flex-row gap-2">
        <Validate :error="errors.name" label="Name" required class="w-full">
          <KTAInput v-model="name" class="w-full" />
        </Validate>
        <Validate
          :error="errors.name_in_charge"
          label="Name in charge"
          required
          class="w-full"
        >
          <KTAInput v-model="nameInCharge" class="w-full" />
        </Validate>
      </div>
      <div class="container-group-input flex flex-col md:flex-row gap-2">
        <Validate
          :error="errors.company_type"
          label="Company type"
          class="w-full"
        >
          <KTADropdown
            v-model="companyTypeSelected"
            :options="COMPANY_TYPE_OPTIONS"
            option-label="name"
            class="w-full"
            @change="changeCompanyType"
          />
        </Validate>
        <Validate :error="errors.size" label="Size" required class="w-full">
          <KTAInputNumber v-model="size" class="w-full" />
        </Validate>
      </div>
      <div class="container-group-input flex flex-col md:flex-row gap-2">
        <Validate :error="errors.email" label="Email" required class="w-full">
          <KTAInput v-model="email" disabled class="w-full" />
        </Validate>
        <Validate :error="errors.phone" label="Phone" required class="w-full">
          <KTAInput v-model="phone" class="w-full" />
        </Validate>
      </div>
      <div class="container-group-input flex flex-col md:flex-row gap-2">
        <Validate
          :error="errors.address"
          label="Address"
          required
          class="w-full"
        >
          <KTAInput v-model="address" class="w-full" />
        </Validate>
        <Validate
          :error="errors.detail_address"
          label="Detail Address"
          class="w-full"
        >
          <KTAInput v-model="detailAddress" class="w-full" />
        </Validate>
      </div>
      <div class="container-group-input flex flex-col md:flex-row gap-2">
        <Validate
          :error="errors.business_day"
          label="Business day"
          required
          class="w-full"
        >
          <KTAInput v-model="businessDay" class="w-full" />
        </Validate>
        <Validate
          :error="errors.closed_day"
          label="Close day"
          required
          class="w-full"
        >
          <KTAInput v-model="closedDay" class="w-full" />
        </Validate>
      </div>
      <div class="container-group-input flex flex-col md:flex-row gap-2">
        <Validate :error="errors.workplace" label="Workplace" class="w-full">
          <KTADropdown
            v-model="workplaceSelected"
            :options="COMPANY_WORKPLACE_OPTIONS"
            option-label="name"
            class="w-full"
            @change="changeWorkplace"
          />
        </Validate>
      </div>
      <div class="container-group-input flex flex-col md:flex-row gap-2">
        <Validate
          :error="errors.accessibility"
          label="Accessibility (Your location in google map)"
          class="w-full"
        >
          <KTAInput v-model="accessibility" class="w-full" />
        </Validate>
      </div>
      <div
        v-if="accessibility"
        class="container-group-input flex flex-col gap-2"
      >
        <label class="span-primary-hover" for="accessibility"
          >Preview your access</label
        >
        <div class="col-span-3 frame-map" v-html="accessibility" />
      </div>
      <div class="container-group-input w-full">
        <CImageUploadV1
          :default-img-value="logo ?? DEFAULT_AVATAR_URL"
          label="Logo"
          name="logo"
          class="text-sm"
          :max-size="5"
          :error="errors.logo ?? ''"
          @handle-remove-file="handleRemoveFile"
          @handle-transfer-file="handleTransferFile"
        />
      </div>
      <Validate
        label="Description"
        class="w-full container-group-input"
        :error="errors.note"
      >
        <KTATextArea v-model="note" class="w-full min-h-[250px]" />
      </Validate>
      <div class="flex justify-end">
        <Button
          class="custom-button w-[80px] h-[40px]"
          @click="onSubmit"
          label="Save"
        />
      </div>
    </div>
  </form>
</template>
<style scoped lang="scss">
.container-group-input {
  border: 1px solid white;
  padding: 16px 8px 16px 8px;
  gap: 8px;

  &:hover {
    border: 1px dashed #bfc4cd;
    border-radius: 10px;
  }
}

.frame-map iframe {
  height: 200px !important;
  width: 100% !important;
}
</style>
