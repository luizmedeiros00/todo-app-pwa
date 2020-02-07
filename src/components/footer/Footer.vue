<template>
     <q-footer elevated>
        <q-toolbar class="bg-orange-8 text-white">
          <q-toolbar-title >R. Amaral - Modulo Tributário</q-toolbar-title>
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
