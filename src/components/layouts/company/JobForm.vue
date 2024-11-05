<script setup lang="ts">
import { get } from "lodash-es";
import { useForm } from "vee-validate";
import { companyJobSchema } from "~/schemas/company/job.schema";
import { JobStore } from "~/stores/company/job";
import Validate from "~/components/common/Validate.vue";
import {
  INTERVIEW_TYPE_OPTIONS,
  JOB_STATUS_OPTIONS,
  TYPE_OF_EMPLOYEE_OPTIONS,
} from "~/constants/job";
import type { OptionSelect } from "~/entities/common";
import KTAInputNumber from "~/components/common/KTAInputNumber.vue";
import type { TreeNode } from "primevue/treenode";
import type { JobEntity } from "~/entities/company/job";
import { MODE_FORM_CREATE } from "~/constants/common";

/** Props and emits */
const props = defineProps({
  mode: {
    type: String,
    default: MODE_FORM_CREATE,
  },
  job: {
    type: Object as PropType<JobEntity>,
  },
});

const emits = defineEmits(["submit"]);

const store = JobStore();
const jobAttributes = computed(() => store.jobAttributes);

const positionNameOptions = computed(() => store.positionNames);
const positionNameSelected = ref<OptionSelect>({ id: 0, name: "Default" });

const statusOptionSelected = ref<OptionSelect>(JOB_STATUS_OPTIONS[0]);

const typeOfEmployeeSelected = ref<OptionSelect>(TYPE_OF_EMPLOYEE_OPTIONS[0]);

const typeOfInterviewSelected = ref<OptionSelect>(INTERVIEW_TYPE_OPTIONS[1]);

const closeDateSelected = ref<Date>();
const expectedOnboardDateSelected = ref<Date>();
const minDate = ref<Date>();

const dataNode = ref<TreeNode[]>([]);
const selectedNode = ref();

/**
 * Form validation
 */
const { handleSubmit, errors, defineField, setFieldValue } = useForm({
  validationSchema: companyJobSchema,
});

const [title] = defineField("title");
const [description] = defineField("description");
const [positionId] = defineField("position_id");
const [numberOfPosition] = defineField("number_of_position");
const [typeOfEmployee] = defineField("type_of_employee");
const [typeOfInterview] = defineField("type_of_interview");
const [closeDate] = defineField("close_date");
const [address] = defineField("address");
const [status] = defineField("status");
const [salaryFrom] = defineField("salary_from");
const [salaryUpto] = defineField("salary_upto");
const [workingTime] = defineField("working_time");
const [expectedOnBoardDate] = defineField("expected_on_board_date");
const [jobAttribute] = defineField("job_attributes");

onMounted(async () => {
  initFormData();
});

const initFormData = () => {
  if (props.mode === MODE_FORM_CREATE) {
    // Mapping position name
    if (positionNameOptions.value.length > 0) {
      positionNameSelected.value = positionNameOptions.value[0];
      positionId.value = Number(positionNameOptions.value[0].id) ?? 0;
    }

    // Mapping close date min
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + 1);
    closeDateSelected.value = currentDate;
    closeDate.value = currentDate.toDateString();
    expectedOnboardDateSelected.value = currentDate;
    expectedOnBoardDate.value = currentDate.toDateString();

    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    minDate.value = yesterday;

    // Mapping tree node
    dataNode.value = mappingTreeNode(jobAttributes.value);
  } else {
    setFieldValue("title", get(props.job, "title", ""));
    setFieldValue(
      "description",
      escapeString(get(props.job, "description", "")),
    );

    setFieldValue("position_id", get(props.job, "position_id", 0));
    positionNameSelected.value = findingOption(
      positionNameOptions.value,
      get(props.job, "position_id", 0),
    );
    setFieldValue(
      "number_of_position",
      get(props.job, "number_of_position", 0),
    );
    setFieldValue("type_of_employee", get(props.job, "type_of_employee", 0));
    typeOfEmployeeSelected.value = findingOption(
      TYPE_OF_EMPLOYEE_OPTIONS,
      get(props.job, "type_of_employee", 0),
    );

    setFieldValue("type_of_interview", get(props.job, "type_of_interview", 0));
    typeOfInterviewSelected.value = findingOption(
      INTERVIEW_TYPE_OPTIONS,
      get(props.job, "type_of_interview", 0),
    );

    setFieldValue("close_date", get(props.job, "close_date", null));
    closeDateSelected.value = get(props.job, "close_date", null)
      ? new Date(convertDateTimeServer(get(props.job, "close_date", null)))
      : null;

    setFieldValue("address", get(props.job, "address", ""));

    setFieldValue("status", get(props.job, "status", 0));
    statusOptionSelected.value = findingOption(
      JOB_STATUS_OPTIONS,
      get(props.job, "status", 0),
    );

    setFieldValue("salary_from", get(props.job, "salary_from", null));
    setFieldValue("salary_upto", get(props.job, "salary_upto", null));
    setFieldValue("working_time", get(props.job, "working_time", null));
    setFieldValue(
      "expected_on_board_date",
      get(props.job, "expected_on_board_date", null),
    );
    expectedOnboardDateSelected.value = get(
      props.job,
      "expected_on_board_date",
      null,
    )
      ? new Date(
          convertDateTimeServer(get(props.job, "expected_on_board_date", null)),
        )
      : null;

    setFieldValue(
      "job_attributes",
      get(props.job, "job_attributes", []).map((item: number) => String(item)),
    );

    // Mapping tree node
    dataNode.value = mappingTreeNode(jobAttributes.value);
    selectedNode.value = mappingResultData(
      dataNode.value,
      get(props.job, "job_attributes", []),
    ).data;
  }
};

const findingOption = (options: any, id: string) => {
  return (
    options.filter((item: any) => Number(item.id) === Number(id))?.[0] ??
    options[0]
  );
};

/**
 * Event change calendar dropdown
 */
const changePositionName = () => {
  positionId.value = Number(positionNameSelected.value?.id) ?? 0;
};

const changeStatus = () => {
  status.value = Number(statusOptionSelected.value.id);
};

const changeTypeOfEmployee = () => {
  typeOfEmployee.value = Number(typeOfEmployeeSelected.value.id);
};

const changeTypeOfInterview = () => {
  typeOfInterview.value = Number(typeOfInterviewSelected.value.id);
};

const changeCloseDate = () => {
  closeDate.value = closeDateSelected.value?.toDateString();
};

const changeExpectedOnboardDate = () => {
  expectedOnBoardDate.value = expectedOnboardDateSelected.value?.toDateString();
};

const selectTreeNode = () => {
  jobAttribute.value = Object.keys(selectedNode.value) ?? [];
};

/**
 * Submit handle
 */
const onSubmit = handleSubmit(async (value) => {
  const mappingIdAttributes = Object.keys(jobAttribute.value).map((_) =>
    String(_),
  );
  const childrenAttributeIds = filterChildrenAttribute(jobAttributes.value);
  const resultUnique = mappingIdAttributes.filter((_) => {
    childrenAttributeIds.includes(_);
  });
  const entity: JobEntity = {
    id: props.job?.id,
    title: title.value,
    position_id: positionNameSelected.value.id,
    status: Number(statusOptionSelected.value.id) ?? 0,
    description: description.value,
    type_of_employee: Number(typeOfEmployeeSelected.value.id) ?? 0,
    number_of_position: numberOfPosition.value,
    working_time: workingTime.value,
    expected_onboard_date: new Date(expectedOnBoardDate.value).toISOString(),
    close_date: new Date(closeDate.value).toISOString(),
    address: address.value,
    interview_type: Number(typeOfInterviewSelected.value.id) ?? 0,
    job_attributes: resultUnique,
  };

  emits("submit", entity);
});
</script>

<template>
  <form class="flex flex-col gap-2 w-full">
    <div class="w-full grid gap-2 grid-cols-2">
      <Validate label="Title" :error="errors.title" required>
        <CommonKTAInput v-model="title" name="title" class="w-full" />
      </Validate>

      <Validate label="Status" :error="errors.status" class="w-full">
        <CommonKTADropdown
          v-model="statusOptionSelected"
          :options="JOB_STATUS_OPTIONS"
          option-label="name"
          select-on-focus
          class="w-full"
          @change="changeStatus"
        />
      </Validate>
    </div>

    <div class="w-full grid gap-2 grid-cols-2">
      <Validate
        v-if="positionNameOptions"
        label="Position name"
        class="w-full"
        :error="errors.position_id"
      >
        <CommonKTADropdown
          v-model="positionNameSelected"
          :options="positionNameOptions"
          filter
          option-label="name"
          class="w-full"
          @change="changePositionName"
        />
      </Validate>
      <Validate
        label="Type of employee"
        class="w-full"
        :error="errors.type_of_employee"
      >
        <CommonKTADropdown
          v-model="typeOfEmployeeSelected"
          :options="TYPE_OF_EMPLOYEE_OPTIONS"
          filter
          option-label="name"
          select-on-focus
          class="w-full"
          @change="changeTypeOfEmployee"
        />
      </Validate>
    </div>

    <div class="w-full grid gap-2 grid-cols-2">
      <Validate
        label="Type of interview"
        class="w-full"
        :error="errors.type_of_employee"
      >
        <CommonKTADropdown
          v-model="typeOfInterviewSelected"
          :options="INTERVIEW_TYPE_OPTIONS"
          filter
          option-label="name"
          select-on-focus
          class="w-full"
          @change="changeTypeOfInterview"
        />
      </Validate>

      <Validate
        label="Number of position"
        :error="errors.number_of_position"
        required
      >
        <KTAInputNumber
          v-model="numberOfPosition"
          class="w-full"
          name="number_of_position"
          showButtons
          :min="0"
          :max="100"
        />
      </Validate>
    </div>

    <label class="text-sm span-primary-hover" for="salary">Salary range</label>
    <small class="span-primary-hover">
      Leave blank if you want to negotiate
    </small>

    <div class="w-full flex gap-2">
      <div class="flex gap-2">
        <Validate class="w-1/3" :error="errors.salary_from">
          <KTAInputNumber
            v-model="salaryFrom"
            class="w-full"
            name="salary_from"
          />
        </Validate>
        <span class="text-center text-xl pt-2">~</span>
        <Validate class="w-1/3" :error="errors.salary_upto">
          <KTAInputNumber
            v-model="salaryUpto"
            class="w-full"
            name="salary_up_to"
          />
        </Validate>

        <label
          for="salary"
          class="break-keep w-[200px] text-center pt-2 span-primary-hover"
          >Preview salary</label
        >
        <div class="flex pt-2 gap-2">
          <span class="min-w-[80px]">{{
            salaryFrom ? `$${salaryFrom}` : ""
          }}</span>
          ~
          <span class="min-w-[80px]">{{
            salaryUpto ? `$${salaryUpto}` : ""
          }}</span>
        </div>
      </div>
    </div>

    <div class="w-full grid gap-2 grid-cols-2">
      <Validate label="Working time" :error="errors.working_time">
        <CommonKTAInput
          v-model="workingTime"
          class="w-full"
          name="working_time"
        />
      </Validate>
      <Validate
        label="Expected onboard date"
        :error="errors.expected_on_board_date"
      >
        <CommonKTACalendar
          v-model="expectedOnboardDateSelected"
          :min-date="minDate"
          class="w-full"
          showIcon
          date-format="yy-mm-dd"
          @change="changeExpectedOnboardDate"
        />
      </Validate>
    </div>

    <div class="w-full grid gap-2 grid-cols-2">
      <Validate label="Address" :error="errors.address" required>
        <CommonKTAInput v-model="address" class="w-full" name="address" />
      </Validate>
      <Validate label="Close date" :error="errors.close_date">
        <CommonKTACalendar
          v-model="closeDateSelected"
          :min-date="minDate"
          class="w-full"
          showIcon
          date-format="yy-mm-dd"
          @change="changeCloseDate"
        />
      </Validate>
    </div>

    <Validate
      label="Description"
      class="w-full"
      :error="errors.description"
      required
    >
      <CommonKTATextArea v-model="description" class="w-full min-h-[250px]" />
    </Validate>

    <Validate
      label="Attribute"
      required
      :error="errors.job_attributes"
      class="w-full"
    >
      <TreeSelect
        v-model="selectedNode"
        :options="dataNode"
        selectionMode="checkbox"
        placeholder="Select job attribute"
        class="w-full"
        display="chip"
        @change="selectTreeNode"
      />
    </Validate>
    <CommonKTAButton label="Create" type="button" @click="onSubmit" />
  </form>
</template>
<style lang="scss" scoped>
:deep(.p-treeselect-label) {
  display: flex;
  flex-direction: column;
  gap: 4px;

  .p-treeselect-token {
    display: block;
    width: fit-content;
  }
}
</style>
