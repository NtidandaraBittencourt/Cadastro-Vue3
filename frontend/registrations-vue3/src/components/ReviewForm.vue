<template>
  <FormDynamic
    title="Revise suas informações"
    :fields="fields"
    :validationSchema="validationSchema"
    @submit="openConfirmationModal"
    @validationFailed="handleValidationFailed"
    @back="handlePreviousStep"
  />

  <BaseModal
    :visible="isModalVisible"
    title="Confirmar Cadastro"
    confirmText="Confirmar"
    cancelText="Cancelar"
    @confirm="handleSubmit"
    @cancel="closeConfirmationModal"
  >
    <template #icon>
      <img src="@/assets/iconConfirm.svg" alt="iconConfirm" />
    </template>
    <template #body>
      <p>
        Tem certeza de que deseja confirmar seu cadastro com as informações fornecidas?
      </p>
    </template>
  </BaseModal>

  <BaseLoader :visible="isLoading" message="Realizando cadastro, por favor aguarde..." />

  <BaseAlert :type="activeAlert.status" v-if="activeAlert.msg">
    {{ activeAlert.msg }}
  </BaseAlert>
</template>

<script setup>
import FormDynamic from "@/components/SharedComponents/FormDynamic.vue";
import { validationSchema } from "@/utils/validationSchema";
import { useRouter } from "vue-router";
import { reactive, ref, onBeforeUnmount } from "vue";
import { useStore } from "@/stores/storeRegistrations";

import BaseAlert from "./SharedComponents/BaseAlert.vue";
import BaseLoader from "./SharedComponents/BaseLoader.vue";
import BaseModal from "./SharedComponents/BaseModal.vue";

const router = useRouter();
const store = useStore();

const fields = ["email", "name", "cpfOrCnpj", "dataInit", "phone", "password"];
const activeAlert = ref({ msg: "", status: "" });
const errors = reactive({});
let timeoutId;

const isModalVisible = ref(false);
const isLoading = ref(false);

function setAlert(msg, status) {
  activeAlert.value = { msg, status };
}

function openConfirmationModal() {
  isModalVisible.value = true;
}

function closeConfirmationModal() {
  isModalVisible.value = false;
}

async function handleSubmit() {
  closeConfirmationModal();
  isLoading.value = true;
  try {
    const response = await store.submitRegistration();
    const message = response?.message || "Cadastro realizado com sucesso!";
    setAlert(message, "success");

    timeoutId = setTimeout(() => {
      router.push({ path: "/" });
      clearOtherFields();
    }, 3000);
  } catch (error) {
    handleFormError(error);
  } finally {
    isLoading.value = false;
  }
}

onBeforeUnmount(() => {
  clearTimeout(timeoutId);
});

function handleFormError(error) {
  if (error.code === "ERR_NETWORK") {
    setAlert(
      "Não foi possível salvar os dados. \nEntre em contato com os responsáveis",
      "warning"
    );
  } else if (error) {
    const errorMessage = error.response?.data?.error || "Ocorreu um erro inesperado.";
    setAlert("Erro ao enviar o formulário: " + errorMessage, "danger");
  }
}

function clearOtherFields() {
  const fieldsToClear = [
    "email",
    "personType",
    "name",
    "cpfOrCnpj",
    "dataInit",
    "phone",
    "password",
  ];
  fieldsToClear.forEach((field) => {
    store.setInputValue({ [field]: "" });
  });
}

function handlePreviousStep() {
  router.push({ name: "config-password" });
}

function handleValidationFailed(validationErrors) {
  Object.assign(errors, validationErrors);
}
</script>
