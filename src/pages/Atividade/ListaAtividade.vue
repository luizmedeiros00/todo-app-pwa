<template>
  <div class="lista-atividade">
    <q-page padding>
      <q-table
        title="Lista de Atividades"
        :data="atividades"
        :columns="columns"
        row-key="id"
         hide-bottom
        :rows-per-page-options="[0]"
        :pagination.sync="pagination"
      >
        <q-td
          slot="body-cell-id"
          slot-scope="item"
          :props="item"
        >
            <q-icon name="event_note" size="1.5rem"  color="gray" />
        </q-td>
        <q-td
          slot="body-cell-cliente"
          slot-scope="item"
          :props="item"
        >
          {{item.row.cliente.nome}}
        </q-td>

        <q-td
          slot="body-cell-status"
          slot-scope="item"
          :props="item"
        >
          <q-badge
            :color="getColorStatus(item.row.status)"
            dark
          >{{ item.row.status }}</q-badge>
        </q-td>
        I

        <q-td
          slot="body-cell-faturado"
          slot-scope="item"
          :props="item"
        >
          <q-badge
            :color="item.row.faturado === 'Sim' ? 'green' : 'red' "
            dark
          >{{ item.row.faturado }}</q-badge>
        </q-td>

        I
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
      :edit="editarAtividade"
      :show="showModal"
      @fechar="fecharModal"
      @salvar="onSubmit($event)"
    />
    <modal-delete
      :dialog="showDeleteModal"
      @fechar="showDeleteModal = false"
      @deletar="deletar($event)"
      :item="editarAtividade"
    />
  </div>
</template>
<script>
import {
  QPage, QTable, QPageSticky,
} from 'quasar';
import AtividadeService from '../../service/Atividade/AtividadeService';
import DinheiroFilter from '../../filter/dinheiro';
import ModalCadastro from './ModalCadastro';
import ModalDelete from '../../components/modal/ModalDelete';

export default {
  name: 'ListaAtividade',
  components: {
    QPage, QTable, QPageSticky, ModalCadastro, ModalDelete,
  },
  data() {
    return {
      showDeleteModal: false,
      AtividadeService: new AtividadeService(),
      showModal: false,
      editarAtividade: {},
      atividades: [],
      colors: {
        'Em andamento': () => 'amber',
        'Não Iniciado': () => 'red',
        Iniciado: () => 'primary',
        default: () => 'green',
      },
      columns: [
        {
          name: 'id', label: '', field: 'id', align: 'left',
        },
        {
          name: 'datacadastro', label: 'Data', field: 'datacadastro', align: 'left',
        },

        {
          name: 'descricao', label: 'Descrição', field: 'descricao', align: 'left',
        },
        {
          name: 'status', label: 'Status', field: 'status', align: 'left',
        },
        {
          name: 'imposto', label: 'Imposto', field: 'imposto', align: 'left',
        },
        {
          name: 'saving', label: 'Saving', field: 'saving', align: 'left', format: val => DinheiroFilter(val),
        },
        {
          name: 'honorario', label: 'Honorario', field: 'honorario', align: 'left', format: val => DinheiroFilter(val),
        },
        {
          name: 'cliente', label: 'Cliente', field: 'cliente', align: 'left',
        },
        {
          name: 'faturado', label: 'Faturado', field: 'faturado', align: 'left',
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
    getColorStatus(status) {
      return (this.colors[status] || this.colors.default)();
    },
    edit(item) {
      this.editarAtividade = { ...item };
      this.showModal = true;
    },
    async onSubmit(atividade) {
      await this.AtividadeService.createOrUpdate(atividade);
      this.load();
      this.fecharModal();
    },
    async load() {
      const data = await this.AtividadeService.list();
      console.log(data);
      this.atividades = data;
    },
    fecharModal() {
      this.showModal = false;
      this.editarAtividade = {};
    },
    showModalDelete(item) {
      this.editarAtividade = item;
      this.showDeleteModal = true;
    },
    async deletar(item) {
      await this.AtividadeService.remove(item.id);
      this.showDeleteModal = false;
      this.load();
    },
  },
  mounted() {
    this.load();
  },
};
</script>
