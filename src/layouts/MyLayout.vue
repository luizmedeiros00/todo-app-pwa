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
          <q-item-label header>Acompanhamentos</q-item-label>

        <q-item clickable v-ripple to="dashboard">
          <q-item-section avatar top>
            <q-avatar icon="folder" color="teal" text-color="white" />
          </q-item-section>
          <q-item-section>
            <q-item-label lines="1">Dashboard</q-item-label>
            <q-item-label caption>Acompanhamentos</q-item-label>
          </q-item-section>
        </q-item>

    
      <q-separator spaced />
      
        <q-item-label header>Cadastros</q-item-label>

        <q-item clickable v-ripple to="produtos">
          <q-item-section avatar top>
            <q-avatar icon="folder" color="teal" text-color="white" />
          </q-item-section>
          <q-item-section>
            <q-item-label lines="1">Produtos</q-item-label>
            <q-item-label caption>Cadastrar um produto</q-item-label>
          </q-item-section>
        </q-item>

      <q-item clickable v-ripple to="categorias">
        <q-item-section avatar top>
          <q-avatar icon="folder" color="primary" text-color="white" />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">Categorias</q-item-label>
          <q-item-label caption>Cadastrar uma categoria do produto</q-item-label>
        </q-item-section>

      </q-item>

       <q-item clickable v-ripple to="subcategorias">
        <q-item-section avatar top>
          <q-avatar icon="folder" color="primary" text-color="white" />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">SubCategoria</q-item-label>
          <q-item-label caption>Cadastrar uma subcategoria do produto</q-item-label>
        </q-item-section>

      </q-item>
      <q-separator spaced />
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
