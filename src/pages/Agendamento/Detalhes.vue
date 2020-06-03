<template>
  <div class="modal-detalhe">
    <q-dialog :value="show" @input="fechar">
      <q-card style="width: 700px; max-width: 100vw;">
        <q-card-section>
          <div class="text-h6">Detalhes</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form>
            <div class="q-gutter-md">

              <q-input outlined type="textarea" v-model="agenda.descricao" label="Observações" />
            </div>
          </q-form>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn
            class="q-mt-md"
            color="grey"
           label="Fechar"
           @click="fechar"
           />

        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { QDialog, QForm } from 'quasar';
import ClienteService from '../../service/Cliente/ClienteService';


export default {
  name: 'ModalCadastroAgenda',
  components: {
    QDialog,
    QForm,
  },
  props: ['show', 'edit'],
  data() {
    return {
      clientes: [],
      users: [],
      ClienteService: new ClienteService(),
      agenda: {},
    };
  },
  methods: {
    salvar() {
      this.$emit('salvar', this.agenda);
    },
    fechar() {
      this.$emit('fechar');
    },
    async loadClientes() {
      const data = await this.ClienteService.list();
      this.clientes = data.map(item => ({ label: item.nome, value: item.id }));
    },
   
  },
  mounted() {
    // this.loadClientes();
    // this.loadUsers();
  },
  watch: {
    edit(newEdit) {
      this.agenda = { ...newEdit };
    },
  },
};
</script>
