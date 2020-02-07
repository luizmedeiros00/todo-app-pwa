<template>
     <q-footer elevated >
        <q-toolbar class="bg-orange-8 text-white center ">
          <q-toolbar-title class="text-subtitle1 text-weight-light">R. Amaral - Modulo Tributário</q-toolbar-title>
        </q-toolbar>
      </q-footer>
</template>
<script>
export default {
  name: 'footer',
  props: {
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
  },
};
</script>
