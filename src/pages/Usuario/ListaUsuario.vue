<template>
  <div class="lista-usuario">
    <q-page padding>
      <q-table
        title="Lista de Usuarios"
        :data="usuarios"
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
          color="accent"
        />
      </q-page-sticky>
    </q-page>
    <modal-cadastro
      :edit="editarUsuario"
      :show="showModal"
      @fechar="fecharModal"
      @salvar="onSubmit($event)"
    />
     <modal-delete
      :dialog="showDeleteModal"
      @fechar="showDeleteModal = false"
      @deletar="deletar($event)"
      :item="editarUsuario"
    />
  </div>
</template>
<script>
import {
  QPage, QTable, QPageSticky,
} from 'quasar';
import UsuarioService from '../../service/Usuario/UsuarioService';
import ModalCadastro from './ModalCadastro';
import ModalDelete from '../../components/modal/ModalDelete';

export default {
  name: 'ListaUsuario',
  components: {
    QPage, QTable, QPageSticky, ModalCadastro, ModalDelete,
  },
  data() {
    return {
      UsuarioService: new UsuarioService(),
      showModal: false,
      showDeleteModal: false,
      editarUsuario: {},
      usuarios: [],
      columns: [
        {
          name: 'name', label: 'Nome', field: 'name', align: 'left',
        },
        {
          name: 'email', label: 'Email', field: 'email', align: 'left',
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
      this.editarUsuario = { ...item };
      this.showModal = true;
    },
    async onSubmit(usuario) {
      await this.UsuarioService.createOrUpdate(usuario);
      this.load();
      this.onReset();
      this.fecharModal();
    },
    async load() {
      const data = await this.UsuarioService.list();
      console.log(data);
      this.usuarios = data;
    },
    onReset() {
      this.usuario = {};
    },
    fecharModal() {
      this.editarUsuario = {};
      this.showModal = false;
    },

    showModalDelete(item) {
      this.editarUsuario = item;
      this.showDeleteModal = true;
    },
    async deletar(item) {
      await this.UsuarioService.remove(item.id);
      this.showDeleteModal = false;
      this.load();
    },

  },
  mounted() {
    this.load();
  },
};
</script>
