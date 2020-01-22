<template>
  <div class="modal-cadastro-cliente">
    <q-dialog :value="show" @input="fechar">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Cadastro Cliente</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form>
            <div class="q-gutter-md">
              <q-input
                outlined
                v-model="cliente.nome"
                label="Nome"
              />
              <q-input
                outlined
                v-model="cliente.cpfcnpj"
                label="CPF ou CNPJ"
              />
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
  name: 'ModalCadastroCliente',
  components: {
    QDialog, QForm,
  },
  props: ['show'],
  data() {
    return {
      cliente: {},
    };
  },
  methods: {
    salvar() {
      this.$emit('salvar', this.cliente);
    },
    fechar() {
      this.$emit('fechar');
    },
  },
};
</script>
