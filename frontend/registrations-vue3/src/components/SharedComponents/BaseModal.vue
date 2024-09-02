<template>
  <transition name="modal">
    <div class="fixed inset-0 flex items-center justify-center z-50" v-if="visible">
      <div
        class="fixed inset-0 bg-black opacity-50"
        @click="closeOnBackdrop && closeModal"
      ></div>
      <div
        class="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full z-10"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div class="px-4 py-5 sm:p-6">
          <div class="sm:flex sm:items-start">
            <div
              class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10"
            >
              <slot name="icon">
                <img src="@/assets/iconInfo.svg" alt="iconInfo" />
              </slot>
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                {{ title }}
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  <slot name="body"> </slot>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-3">
          <BaseButton @click="confirmAction" variant="primary">
            {{ confirmText }}
          </BaseButton>
          <BaseButton @click="cancelAction" variant="secondary">
            {{ cancelText }}
          </BaseButton>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import BaseButton from "./BaseButton.vue";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "Confirmação",
  },
  confirmText: {
    type: String,
    default: "Confirmar",
  },
  cancelText: {
    type: String,
    default: "Cancelar",
  },
  closeOnBackdrop: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["confirm", "cancel"]);

function confirmAction() {
  emit("confirm");
}

function cancelAction() {
  emit("cancel");
}

function closeModal() {
  emit("cancel");
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
