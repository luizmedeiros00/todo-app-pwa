<template>
  <div class="lista-cliente">
    <q-page padding>
      <q-table
        title="Lista de Clientes"
        :data="clientes"
        :columns="columns"
        row-key="id"
        hide-bottom
        :rows-per-page-options="[0]"
        :pagination.sync="pagination"
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
          @click="showModal = true"
          fab
          icon="add"
          color="accent"
        />
      </q-page-sticky>
    </q-page>
    <modal-cadastro
      :show="showModal"
      @fechar="fecharModal"
      @salvar="onSubmit($event)"
    />
  </div>
</template>
<script>
import { QPage, QTable, QPageSticky } from 'quasar';
import ClienteService from '../../service/Cliente/ClienteService';
import ModalCadastro from './ModalCadastro';

export default {
  name: 'ListaCliente',
  components: {
    QPage, QTable, QPageSticky, ModalCadastro,
  },
  data() {
    return {
      ClienteService: new ClienteService(),
      showModal: false,
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
      pagination: {
        page: 1,
        rowsPerPage: 0, // 0 means all rows
      },
    };
  },
  methods: {
    edit(item) {
      this.cliente = { ...item };
    },
    async onSubmit(cliente) {
      await this.ClienteService.createOrUpdate(cliente);
      this.load();
      this.onReset();
      this.fecharModal();
    },
    async load() {
      const data = await this.ClienteService.list();
      this.clientes = data;
    },
    onReset() {
      this.cliente = {};
    },
    fecharModal() {
      this.showModal = false;
    },
  },
  mounted() {
    this.load();
  },
};
</script>
