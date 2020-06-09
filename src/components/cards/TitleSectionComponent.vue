<template>
    <q-card-section>
        <div class="text-overline text-orange-9">{{title1}}</div>
        <div class="text-h5 q-auto">{{title2}}</div>
    </q-card-section>
</template>

<script>
export default {
  name: 'TitleSectionComponent',
  props: {
    title1: {
      type: String,
    },
    title2: {
      type: String,
    },
  },
};
</script>
