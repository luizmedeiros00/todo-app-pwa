<template>
  <div class="modal-cadastro-cliente">
   
      <q-card class="my-card">
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
                v-model="cliente.telefone"
                label="Telefone"
              />
              <q-input
                outlined
                v-model="cliente.email"
                label="Email/Login"
              />
              
               <q-input
               type="password"
                outlined
                v-model="cliente.password"
                label="Senha"
              />
             
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
            label="Registrar"
            @click="salvar"
            type="submit"

            class="q-mt-md"
            color="primary"
          />
        </q-card-actions>
      </q-card>
   
  </div>
</template>
<script>
import {
  QDialog, QForm, QLayout,
  QPageContainer, QPage, QCard
} from 'quasar';
import { mask } from 'vue-the-mask';
import UserService from '../../service/Usuario/UsuarioService';
import ClienteService from '../../service/Cliente/ClienteService';
import RegisterService from '../../service/Register/RegisterService';


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
       usuarios:{},
     
     
         segmentos: ['Comercio','Textil','Outros'],
          ClienteService: new ClienteService(),
          UserService: new UserService(),
           RegisterService: new RegisterService(),
    };
  },
  methods: {
    async salvar() {
        await this.ClienteService.createOrUpdate(this.cliente);
        console.log(this.cliente);
        //pega o ultimo id salvo
        const ultimo =  await this.ClienteService.ultimoRegistro();
         console.log(ultimo.id)
        this.usuarios.cliente_id = ultimo.id;
        this.usuarios.name = this.cliente.razao_social
        this.usuarios.email = this.cliente.email
        this.usuarios.password = this.cliente.password
        this.usuarios.tipo = 'Usuario'

        console.log(this.usuarios)


        //registra o usuario
          this.RegisterService.createOrUpdate(this.usuarios);
          this.$q.notify({
        message: 'Operação realizada com sucesso!',
        color: 'green',
      });
           this.$router.push("/login")
    
    },
    fechar() {
    this.$router.push("/login")
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
