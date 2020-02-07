<template>
  <q-dialog :value="alert" persistent>
    <q-card>
      <q-card-section>
        <div class="text-h6">Aviso</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        Ocorreu uma falha na comunicação com o banco de dados, verifique sua conexão!
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          label="OK"
          color="primary"
          @click="fechar"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
import { mapState } from 'vuex';

export default {
  computed: { ...mapState('dialog', ['alert']) },
  methods: {
    fechar() {
      this.$store.commit('dialog/SHOW', false);
    },
  },
};
</script>
