<template>
  <FormDynamic
    title="Revise suas informações"
    :fields="fields"
    :validationSchema="validationSchema"
    @submit="handleSubmit"
    @validationFailed="handleValidationFailed"
    @back="handlePreviousStep"
  />
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

const router = useRouter();
const store = useStore();

const fields = ["email", "name", "cpfOrCnpj", "dataInit", "phone", "password"];
const activeAlert = ref({ msg: "", status: "" });
const errors = reactive({});
let timeoutId;

function setAlert(msg, status) {
  activeAlert.value = { msg, status };
}

async function handleSubmit() {
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
