<template>
    <q-card-section class="bg-grey-1 text-black-9 text-subtitle-1">
        <div class="text-subtitle1 text-weight-light">{{title}}</div>
        <div class="text-subtitle2 text-weight-light text-grey-6">{{subtitle}}</div>
    </q-card-section>
</template>

<script>
export default {
    name: 'ModalTitleComponent',
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
