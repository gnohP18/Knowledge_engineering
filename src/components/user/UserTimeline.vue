<script setup lang="ts">
import {
  INTERVIEW_STATUS_NAME,
  SUBMITTED,
  WATCHED,
  INTERVIEW_DATE_SET,
  INTERVIEW_IN_PROGRESS,
  HIRED,
  REJECTED,
  OFFER_DECISION,
  ACCEPT_OFFER,
  REJECT_OFFER,
  ONBOARD_DATE_SET,
} from "~/constants/application";
import { MODE_USER_VIEW } from "~/constants/common";

const props = defineProps({
  status: {
    type: Number,
    default: 0,
  },
  mode: {
    type: String,
    default: MODE_USER_VIEW,
  },
  interviewDateTime: {
    type: String,
  },
});

const events = [
  {
    status: INTERVIEW_STATUS_NAME[SUBMITTED],
    icon: "pi pi-check",
    color: "#11B9B5",
  },
  {
    status: INTERVIEW_STATUS_NAME[WATCHED],
    icon: "pi pi-ellipsis-h",
    color: "#E5E5E5",
  },
  {
    status: INTERVIEW_STATUS_NAME[INTERVIEW_DATE_SET],
    icon: "pi pi-ellipsis-h",
    color: "#E5E5E5",
  },
  {
    status: INTERVIEW_STATUS_NAME[INTERVIEW_IN_PROGRESS],
    icon: "pi pi-ellipsis-h",
    color: "#E5E5E5",
  },
  {
    status: INTERVIEW_STATUS_NAME[HIRED],
    icon: "pi pi-ellipsis-h",
    color: "#E5E5E5",
  },
  {
    status: INTERVIEW_STATUS_NAME[REJECTED],
    icon: "pi pi-ellipsis-h",
    color: "#E5E5E5",
  },
  {
    status: INTERVIEW_STATUS_NAME[OFFER_DECISION],
    icon: "pi pi-ellipsis-h",
    color: "#E5E5E5",
  },
  {
    status: INTERVIEW_STATUS_NAME[ACCEPT_OFFER],
    icon: "pi pi-ellipsis-h",
    color: "#E5E5E5",
  },
  {
    status: INTERVIEW_STATUS_NAME[REJECT_OFFER],
    icon: "pi pi-ellipsis-h",
    color: "#E5E5E5",
  },
  {
    status: INTERVIEW_STATUS_NAME[ONBOARD_DATE_SET],
    icon: "pi pi-ellipsis-h",
    color: "#E5E5E5",
  },
];

interface EventInterview {
  status?: string;
  icon?: string;
  color?: string;
}

const step = ref<EventInterview[]>([]);

onMounted(() => {
  for (let i = 0; i < events.length; i++) {
    if (i < Number(props.status)) {
      const obj: EventInterview = {
        status: events[i].status,
        color: "#11B9B5",
        icon: "pi pi-check",
      };

      step.value.push(obj);
    } else {
      const obj: EventInterview = {
        status: events[i].status,
        color: "#E5E5E5",
        icon: "pi pi-ellipsis-h",
      };

      step.value.push(obj);
    }
  }

  console.log(props.status, step.value);
});
</script>
<template>
  <Timeline class="w-1/3 flex justify-start" :value="step" align="left">
    <template #marker="slotProps">
      <span
        class="flex w-[30px] h-[30px] items-center justify-center text-white timeline-items rounded-full"
        :style="{ backgroundColor: slotProps.item.color }"
      >
        <span :class="slotProps.item.icon"></span>
      </span>
    </template>
    <template #content="slotProps">
      <div class="flex flex-col">
        <span
          class="span-primary-hover text-sm text-[#a7a7a7]"
          :class="{
            'font-bold':
              INTERVIEW_STATUS_NAME[
                props.status as keyof typeof INTERVIEW_STATUS_NAME
              ] === slotProps.item.status,
          }"
        >
          {{ slotProps.item.status }}
        </span>
        <span
          v-if="
            slotProps.item.status ===
              INTERVIEW_STATUS_NAME[INTERVIEW_DATE_SET] &&
            props.mode === MODE_USER_VIEW
          "
          class="text-sm span-primary-hover"
        >
          {{ props.interviewDateTime }}
        </span>
      </div>
    </template>
  </Timeline>
</template>
