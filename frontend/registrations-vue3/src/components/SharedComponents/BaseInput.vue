<template>
  <div class="mb-4">
    <label :for="id" class="block text-sm font-medium text-gray-700">
      {{ label }}
    </label>
    <div v-if="type === 'radio' || type === 'checkbox'" class="mt-1">
      <label
        v-for="(option, index) in options"
        :key="index"
        class="mr-4 inline-flex items-center"
      >
        <input
          :id="`${id}-${option.value}`"
          :type="type"
          :value="option.value"
          v-model="inputValue"
          @change="updateValue($event.target.value)"
          class="mr-2"
        />
        {{ option.label }}
      </label>
    </div>
    <input
      v-else
      :id="id"
      :type="type"
      :value="inputValue"
      :data-testid="`input-${id}`"
      @input="updateValue($event.target.value)"
      @blur="validate"
      :placeholder="placeholder"
      v-maska="mask"
      class="mt-1 block w-full px-3 py-2 border border-black rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      :class="localErrorMessage ? 'border-red-500' : ''"
    />
    <p
      v-if="localErrorMessage"
      class="text-sm text-red-600 mt-1"
      :data-qa="`error-message-${id}`"
    >
      {{ localErrorMessage }}
    </p>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { vMaska } from "maska/vue";
import { useStore } from "@/stores/storeRegistrations";

const props = defineProps({
  modelValue: [String, Boolean],
  label: String,
  type: {
    type: String,
    default: "text",
  },
  placeholder: String,
  id: String,
  errorMessage: String,
  mask: {
    type: String,
    required: false,
  },
  options: {
    type: Array,
    default: () => [],
  },
  validateField: Function,
});

const store = useStore();

const emit = defineEmits(["update:modelValue", "update:errorMessage"]);

const inputValue = ref(props.modelValue);

const localErrorMessage = ref(props.errorMessage);

function updateValue(value) {
  if (
    props.id === "personType" &&
    store.inputValues.personType &&
    store.inputValues.personType !== value
  ) {
    clearOtherFields();
  }
  emit("update:modelValue", value);
  inputValue.value = value;
  validate();
}

function clearOtherFields() {
  const fieldsToClear = ["name", "cpfOrCnpj", "dataInit", "phone"];
  fieldsToClear.forEach((field) => {
    store.setInputValue({ [field]: "" });
  });
}

async function validate() {
  if (props.validateField) {
    try {
      await props.validateField(props.id, inputValue.value);
      localErrorMessage.value = "";
    } catch (error) {
      localErrorMessage.value = error.message || "Erro de validação";
      return;
    }
  }
}

watch(
  () => props.modelValue,
  (newValue) => {
    inputValue.value = newValue;
  }
);

watch(
  () => props.errorMessage,
  (newErrorMessage) => {
    localErrorMessage.value = newErrorMessage;
  }
);
</script>
