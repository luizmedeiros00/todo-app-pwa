<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      elevated
      class="primary"
    >
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title>Ramaral</q-toolbar-title>

        <!-- <q-btn flat round dense icon="more_vert" /> -->
        <q-btn-dropdown
          flat round dense
        >
          <q-list>

            <q-item
              clickable
              v-close-popup
              @click="logout"
            >
              <q-item-section>
                <q-item-label>Sair</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="primary"
    >
      <q-list>
        <q-item-label header >Menu</q-item-label>
        <q-item to="/">
          <q-item-section avatar>
            <q-icon name="poll" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Dashboard</q-item-label>
            <q-item-label caption>Graficos</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="cliente">
          <q-item-section avatar>
            <q-icon name="people" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Clientes</q-item-label>
            <q-item-label caption>Informações dos clientes</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="atividade">
          <q-item-section avatar>
            <q-icon name="event_note" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Atividades</q-item-label>
            <q-item-label caption>Lista de atividades</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="usuario">
          <q-item-section avatar>
            <q-icon name="account_box" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Usuarios</q-item-label>
            <q-item-label caption>Usuarios do sistema</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
import { QBtnDropdown } from 'quasar';

export default {
  name: 'MyLayout',
  components: { QBtnDropdown },
  data() {
    return {
      showModalSobre: false,
      leftDrawerOpen: false,
    };
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/AUTH_LOGOUT').then(() => {
        this.$router.push('/login');
      });
    },
    showModal() {
      this.showModalSobre = true;
    },
  },
};
</script>
