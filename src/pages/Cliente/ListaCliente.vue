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
            @click="showModalDelete(props.row)"
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
          color="primary"
        />
      </q-page-sticky>
    </q-page>
    <modal-cadastro
      :edit="editarCliente"
      :show="showModal"
      @fechar="fecharModal"
      @salvar="onSubmit($event)"
    />
     <modal-delete
      :dialog="showDeleteModal"
      @fechar="showDeleteModal = false"
      @deletar="deletar($event)"
      :item="editarCliente"
    />
  </div>
</template>
<script>
import {
  QPage, QTable, QPageSticky,
} from 'quasar';
import ClienteService from '../../service/Cliente/ClienteService';
import ModalCadastro from './ModalCadastro';
import ModalDelete from '../../components/modal/ModalDelete';

export default {
  name: 'ListaCliente',
  components: {
    QPage, QTable, QPageSticky, ModalCadastro, ModalDelete,
  },
  data() {
    return {
      ClienteService: new ClienteService(),
      showModal: false,
      showDeleteModal: false,
      editarCliente: {},
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
      this.editarCliente = { ...item };
      this.showModal = true;
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
      this.editarCliente = {};
      this.showModal = false;
    },

    showModalDelete(item) {
      this.editarCliente = item;
      this.showDeleteModal = true;
    },
    async deletar(item) {
      await this.ClienteService.remove(item.id);
      this.showDeleteModal = false;
      this.load();
    },

  },
  mounted() {
    this.load();
  },
};
</script>
