<template>
    <q-footer>
     
    
        <q-bar dense class="bg-primary text-white center text-weight-light">
            <div  class="text-subtitle2 text-weight-regular ">MinhaLoja - Versão 1.0.0</div>
        </q-bar>
    
    
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