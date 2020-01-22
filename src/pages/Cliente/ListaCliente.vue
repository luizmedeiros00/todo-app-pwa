<template>
  <div class="lista-cliente">
    <q-page padding>
      <q-table
        title="Lista de Clientes"
        :data="clientes"
        :columns="columns"
        row-key="id"
      >
        <q-td
          slot="body-cell-action"
          slot-scope="props"
          :props="props"
        >
          <q-btn
            @click="edit(props.row)"
            color="primary"
            flat
            icon="edit"
          />
          <q-btn
            color="red"
            flat
            icon="delete"
          />
        </q-td>
      </q-table>
      <q-page-sticky
        position="bottom-right"
        :offset="[18, 18]"
      >
        <q-btn
          fab
          icon="add"
          color="accent"
        />
      </q-page-sticky>
    </q-page>
  </div>
</template>
<script>
import { QPage, QTable, QPageSticky } from 'quasar';
import ClienteService from '../../service/Cliente/ClienteService';

export default {
  name: 'ListaCliente',
  components: { QPage, QTable, QPageSticky },
  data() {
    return {
      ClienteService: new ClienteService(),
      cliente: {},
      clientes: [],
      columns: [
        {
          name: 'nome', label: 'Nome', field: 'nome', align: 'left',
        },
        {
          name: 'cpfcnpj', label: 'CPF/CNPJ', field: 'cpfcnpj', align: 'left',
        },
        {
          name: 'action', label: 'Ação', field: 'action', align: 'left',
        },
      ],
    };
  },
  methods: {
    edit(item) {
      this.cliente = { ...item };
    },
    async onSubmit() {
      await this.ClienteService.createOrUpdate(this.cliente);
      this.load();
      this.onReset();
    },
    async load() {
      const data = await this.ClienteService.list();
      this.clientes = data;
    },
    onReset() {
      this.cliente = {};
    },
  },
  mounted() {
    this.load();
  },
};
</script>
