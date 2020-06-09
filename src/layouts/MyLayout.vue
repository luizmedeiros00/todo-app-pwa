<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated class="primary">
            <q-toolbar>
                <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" icon="menu" aria-label="Menu" />
    
                <q-toolbar-title v-if="isAdmin || isCoordenador">Administração </q-toolbar-title>
                <q-toolbar-title v-if="isUser">MinhaLoja </q-toolbar-title>
    
                <!-- <q-btn flat round dense icon="more_vert" /> -->
                <span style="fontSize:14px;textAling:right">{{nomeUser}}</span>
                <q-btn-dropdown flat round dense>
                    <q-list>
    
                        <q-item clickable v-close-popup @click="logout">
                            <q-item-section>
                                <q-item-label>Sair</q-item-label>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-btn-dropdown>
            </q-toolbar>
        </q-header>
    
        <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="primary">
        <div class="q-pa-md q-gutter-md">
          <q-list bordered padding  style="max-width: 350px">
            <q-item-label header>Menu</q-item-label>
              <q-item clickable v-ripple to="dashboard">
                <q-item-section avatar top>
                  <q-avatar icon="fas fa-chart-line" color="primary" text-color="white" size="md"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label lines="1">Acompanhamentos</q-item-label>
                  <q-item-label caption>Painel de acompanhamento</q-item-label>
                </q-item-section>
              </q-item>
                <q-item clickable v-ripple to="clientes">
                <q-item-section avatar top>
                  <q-avatar icon="fas fa-user" color="primary" text-color="white" size="md"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label lines="1">Clientes</q-item-label>
                  <q-item-label caption>Inclusão de Clientes</q-item-label>
                </q-item-section>
              </q-item>
     
              <q-expansion-item to="produtos"
              expand-separator icon="fas fa-box-open" 
              label="Produtos" 
              caption="Cadastro do produto" 
             
              header-class="text-primary"
              > 
                <q-item clickable v-ripple to="categorias">
                  <q-item-section avatar top>
                    <q-avatar icon="fas fa-folder" color="primary" text-color="white" size="xs" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label lines="1">Categorias</q-item-label>
                    <q-item-label caption>Inclusão de categorias</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable v-ripple to="subcategorias">
                  <q-item-section avatar top>
                    <q-avatar icon="fas fa-folder" color="primary" text-color="white"  size="xs" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label lines="1">Subcategoria</q-item-label>
                    <q-item-label caption>Inclusão de subcategoria </q-item-label>
                  </q-item-section>
                </q-item>
             </q-expansion-item>

            <q-expansion-item to="funcionarios"
              expand-separator icon="fas fa-box-open" 
              label="Funcionarios" 
              caption="Cadastro do funcionario" 
             
              header-class="text-primary"
              > 
                <q-item clickable v-ripple to="cargos">
                  <q-item-section avatar top>
                    <q-avatar icon="fas fa-folder" color="primary" text-color="white" size="xs" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label lines="1">Cargos</q-item-label>
                    <q-item-label caption>Inclusão de cargos</q-item-label>
                  </q-item-section>
                </q-item>
               
             </q-expansion-item>
              <q-expansion-item 
              expand-separator icon="fas fa-retweet" 
              label="Estoque" 
              caption="Movimento Estoque" 
              header-class="text-primary"
              > 
                <q-item clickable v-ripple to="estoque">
                  <q-item-section avatar top>
                    <q-avatar icon="fas fa-folder" color="primary" text-color="white" size="xs" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label lines="1">Entrada/Saida</q-item-label>
                    <q-item-label caption>Gerenciar entrada e saida de produtos</q-item-label>
                  </q-item-section>
                </q-item>
               
             </q-expansion-item>
          </q-list>
        </div>

        </q-drawer>
    
        <q-page-container>
            <router-view />
        </q-page-container>
        <modal-dialog />
    </q-layout>
</template>

<script>
import { QBtnDropdown } from 'quasar';
import { mapGetters } from 'vuex';
import UsuarioService from '../service/Usuario/UsuarioService';
import ModalDialog from '../components/modal/ModalDialog';

export default {

    name: 'MyLayout',
    components: { QBtnDropdown, ModalDialog },
    computed: { ...mapGetters('user', ['nomeUser', 'isAdmin','isUser','isCoordenador']) },
    data() {
        return {
            versao: process.env.APP_VERSAO,
            UsuarioService: new UsuarioService(),
            showModalSobre: false,
            leftDrawerOpen: false,
            
            usuario: null,
        };
    },
    methods: {
        logout() {
            this.$store.dispatch('auth/AUTH_LOGOUT').then(() => {
                this.$router.push('/login');
            });
        },
       
    },


};
</script>
