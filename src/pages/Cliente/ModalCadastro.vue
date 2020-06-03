<template>
  <div class="modal-cadastro-cliente">
    <q-dialog :value="show" @input="fechar">
      <q-card class="my-card" style="width: 700px; max-width: 150vw;">
        <q-card-section class="bg-orange text-white ">
          <div class="text-h6">Cadastro Cliente</div>
        </q-card-section>

        <q-card-section >
          <q-form>
            <input type="hidden" v-model="cliente.id" />
            <div class="q-gutter-md">
              
               <q-input
                outlined
                v-model="cliente.razao_social"
                label="Razão Social"
              />
              <q-input
               v-mask="['###.###.###-##', '##.###.###/####-##']"
                outlined
                v-model="cliente.cpfcnpj"
                label="CPF ou CNPJ"
              />
                <q-select filled v-model="cliente.ramo" :options="segmentos" label="Segmento" />
              <q-input
                outlined
                v-model="cliente.nome"
                label="Contato"
              />
              <q-input
                outlined
                v-model="cliente.email"
                label="Email"
              />
               <q-input
                outlined
                v-model="cliente.telefone"
                label="Telefone"
              />
               <!-- <q-select
                emit-value
                map-options
                filled
                v-model="cliente.user_id"
                :options="users"
                label="Usuario"
              /> -->
            </div>
          </q-form>
        </q-card-section>

        <q-card-actions
          align="right"
          class="bg-white text-teal"
        >
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
import {
  QDialog, QForm,
} from 'quasar';
import { mask } from 'vue-the-mask';
import UserService from '../../service/Usuario/UsuarioService';

export default {
  name: 'ModalCadastroCliente',
  components: {
    QDialog, QForm,
  },
  directives: { mask },
  props: ['show', 'edit'],
  data() {
    return {
      cliente: {},
       users: [],
         segmentos: ['Comercio','Textil','Outros'],
          UserService: new UserService(),
    };
  },
  methods: {
    salvar() {
      this.$emit('salvar', this.cliente);
    },
    fechar() {
      this.$emit('fechar');
    },
  
     async loadUsers() {
      const data = await this.UserService.list();
      this.users = data.data.map(item => ({ label: item.name, value: item.id }));
    },
},
  mounted() {
    this.loadUsers();
 
  },
  watch: {
    edit(newEdit) {
      this.cliente = { ...newEdit };
    },
  },
};
</script>
