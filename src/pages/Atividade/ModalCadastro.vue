<template>
  <div class="modal-cadastro-atividade">
    <q-dialog :value="show" @input="fechar">
      <q-card style="width: 700px; max-width: 100vw;">
        <q-card-section>
          <div class="text-h6">Cadastro Atividade</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form>
            <div class="q-gutter-md">
              <q-input
                outlined
                v-model="atividade.datacadastro"
                label="Data Cadastro"
              />
              <q-input
                outlined
                v-model="atividade.descricao"
                label="Descricao"
              />
                <q-select filled v-model="atividade.imposto" :options="impostos" label="Impostos" />
                <q-input
                outlined
                v-model="atividade.saving"
                label="Saving"
              />
                <q-input
                outlined
                v-model="atividade.honorario"
                label="Honorario"
              />
                <q-select filled v-model="atividade.cliente_id" :options="cli" label="Clientes" />
                <q-select filled v-model="atividade.faturado" :options="faturado" label="Faturado" />
                <q-select filled v-model="atividade.status" :options="status" label="Status" />
            </div>
          </q-form>
        </q-card-section>

        <q-card-actions
          align="right"
          class="bg-white text-teal"
        >
          <q-btn
            flat
            label="Salvar"
            @click="salvar"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import {
  QDialog, QForm,
} from 'quasar';

export default {
  name: 'ModalCadastroAtividade',
  components: {
    QDialog, QForm,
  },
  props: ['show', 'cli'],
  data() {
    return {
      impostos: ['PIS', 'COFINS'],
      faturado: ['Sim', 'Não'],
      status: ['Iniciado', 'Não Iniciado','Em andamento','Concluido'],
      atividade: {},
    };
  },
  methods: {
    salvar() {
      this.$emit('salvar', this.atividade);
    },
    fechar() {
      this.$emit('fechar');
    },
  },
};
</script>
