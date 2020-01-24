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
                type="date"

                fill-mask
                v-model="atividade.datacadastro"
                label="Data Inicio"
              />
              <q-input
                outlined

                type="date"
                fill-mask
                v-model="atividade.datafinalprevista"
                label="Data Final Prevista"
              />
              <q-input
                outlined

                type="date"
                fill-mask
                v-model="atividade.datafinal"
                label="Data Final"
              />

              <q-input outlined v-model="atividade.descricao" label="Descricao" />
              <q-select filled v-model="atividade.imposto" :options="impostos" label="Impostos" />
              <q-input outlined v-model="atividade.saving" label="Saving" />
              <q-input outlined v-model="atividade.honorario" label="Honorario" />
              <q-select
                emit-value
                map-options
                filled
                v-model="atividade.cliente_id"
                :options="clientes"
                label="Clientes"
              />
              <q-select filled v-model="atividade.faturado" :options="faturado" label="Faturado" />
              <q-select filled v-model="atividade.status" :options="status" label="Status" />
              <q-select
                emit-value
                map-options
                filled
                v-model="atividade.user_id"
                :options="users"
                label="Responsável"
              />
              <q-input outlined type="textarea" v-model="atividade.obs" label="Observações" />
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
          <q-btn
            label="Salvar"
            @click="salvar"
            type="submit"
            class="q-mt-md"
            color="primary"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { QDialog, QForm } from 'quasar';
import ClienteService from '../../service/Cliente/ClienteService';
import UserService from '../../service/Usuario/UsuarioService';

export default {
  name: 'ModalCadastroAtividade',
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
      UserService: new UserService(),
      impostos: ['IRPJ/CSLL', 'PIS/COFINS', 'INSS', 'ISS', 'Outros'],
      faturado: ['Sim', 'Não', 'N/A'],
      status: ['Iniciado', 'Não Iniciado', 'Em andamento', 'Concluido'],
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
    async loadClientes() {
      const data = await this.ClienteService.list();
      this.clientes = data.data.map(item => ({ label: item.nome, value: item.id }));
    },
    async loadUsers() {
      const data = await this.UserService.list();
      this.users = data.data.map(item => ({ label: item.name, value: item.id }));
    },
  },
  mounted() {
    this.loadClientes();
    this.loadUsers();
  },
  watch: {
    edit(newEdit) {
      this.atividade = { ...newEdit };
    },
  },
};
</script>
