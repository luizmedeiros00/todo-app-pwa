<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-orange">
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

        <div>v.1.20.0</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-2">
      <q-list>
        <q-item-label header>Menu</q-item-label>
        <q-item to="dashboard">
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
        <!-- 
          Informações de registro do sistema, por enquanto nao vamos utilizar
          <q-item to="#" @click="showModal()">
          <q-item-section avatar>
            <q-icon name="account_box" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Sobre</q-item-label>
            <q-item-label caption>Sobre o sistema</q-item-label>
          </q-item-section>
        </q-item> 
         <modal-sobre
      :dialog="showModalSobre"
      @fechar="showModalSobre = false"
    /> 
    -->
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>


<script>
import ModalSobre from "../components/modal/ModalSobre";
export default {
  name: "MyLayout",
  data() {
    return {
      showModalSobre:false,
      leftDrawerOpen:false
    };
  },
  components: {
    ModalSobre
  },
  methods: {
    showModal() {
    
      this.showModalSobre=true;
    }
  }
};
</script>
