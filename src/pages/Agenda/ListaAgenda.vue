<template>
  <div class="lista-agenda">
    <q-page padding>
      <q-table
        title="Agenda de reuniões"
        :data="agendas"
        :columns="columns"
        row-key="id"
        hide-bottom
        :rows-per-page-options="[]"
        :pagination.sync="pagination"
        :loading="loading"
      >
        <template v-slot:loading>
          <q-inner-loading
            showing
            color="primary"
          />
        </template>
        <q-td
          slot="body-cell-descricao"
          slot-scope="item"
          :props="item"
        >
          {{item.row.descricao.length > 40 ? `${item.row.descricao.substring(0,40)}...`
            : item.row.descricao}}
        </q-td>

        <q-td
          slot="body-cell-id"
          slot-scope="item"
          :props="item"
        >
          <q-icon
            name="event_note"
            size="1.5rem"
            color="gray"
          />
        </q-td>
        <q-td
          slot="body-cell-cliente"
          slot-scope="item"
          :props="item"
        >
          {{item.row.cliente.razao_social}}
        </q-td>

        <q-td
          slot="body-cell-ramo"
          slot-scope="item"
          :props="item"
        >
          <q-badge
            :color="getColorRamo(item.row.ramo)"
            dark
          >{{ item.row.ramo }}</q-badge>
        </q-td>
        I

        <q-td
          slot="body-cell-retorno"
          slot-scope="item"
          :props="item"
        >
          <q-badge
            :color="item.row.retorno === 'Sim' ? 'green' : 'red' "
            dark
          >{{ item.row.retorno }}</q-badge>
        </q-td>

        I
        <q-td
          slot="body-cell-action"
          slot-scope="props"
          :props="props"
        >
         <q-btn
            @click="confirma(props.row)"
            color="green"
            flat
            placeholder="Confirmar/Desconfirmar"
            icon="check"
          />
          <q-btn v-if="isAdmin || isCoordenador"
            @click="edit(props.row)"
            color="primary"
            flat
            icon="edit"
          />
          <q-btn v-if="isAdmin || isCoordenador"
            @click="showModalDelete(props.row)"
            color="red"
            flat
            icon="delete"
          />
          
          <q-btn
            @click="editDetalhe(props.row)"
            color="grey"
            flat
            placeholder="Detalhes do agendamento"
            icon="chat"
          />
        </q-td>
      </q-table>

      <paginacao
        :last_page="lastPage"
        :current_page="currentPage"
        @input="load($event)"
      />

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
      :edit="editarAgenda"
      :show="showModal"
      @fechar="fecharModal"
      @salvar="onSubmit($event)"
    />
    <modal-detalhe
      :edit="editarAgenda"
      :show="showModalDetalhe"
      @fechar="fecharModal"
      @salvar="onSubmit($event)"
    />
    <modal-delete
      :dialog="showDeleteModal"
      @fechar="showDeleteModal = false"
      @deletar="deletar($event)"
      :item="editarAgenda"
    />
      <footer-component />

  </div>

</template>

<script>
import {
  QPage, QTable, QPageSticky, QInnerLoading,
} from 'quasar';
import { mapGetters } from 'vuex';
import AgendaService from '../../service/Agenda/AgendaService';
import DinheiroFilter from '../../filter/dinheiro';
import DataFilter from '../../filter/data';
import ModalCadastro from './ModalCadastro';
import ModalDetalhe from './Detalhes';
import FooterComponent from '../../components/footer/Footer';
import ModalDelete from '../../components/modal/ModalDelete';
import Paginacao from '../../components/table/Paginate';

export default {
  name: 'ListaAgenda',
  computed: { ...mapGetters('user', ['nomeUser', 'isAdmin', 'isCoordenador']) },
  components: {
    QPage, QTable, QPageSticky, ModalCadastro, ModalDelete, ModalDetalhe, Paginacao, QInnerLoading, FooterComponent,
  },
  data() {
    return {
      loading: false,
      currentPage: 0,
      lastPage: 0,
      showDeleteModal: false,
      AgendaService: new AgendaService(),
      showModal: false,
      showModalDetalhe: false,
      editarAgenda: {},
      agendas: [],
      colors: {
        'Em andamento': () => 'amber',
        'Não Iniciado': () => 'red',
        Iniciado: () => 'primary',
        default: () => 'green',
      },
      columns: [
        {
          name: 'id', style: 'min-width: 15px; width: 15px', label: '', field: 'id', align: 'left',
        },
        {
          name: 'dataagendamento', label: 'Data Agendamento', field: 'dataagendamento', align: 'center', format: val => DataFilter(val),
        },
        {
          name: 'hora', label: 'Hora', field: 'horaagendamento', align: 'center', 
        },
       
        {
          name: 'cliente', label: 'Cliente', field: 'cliente', align: 'center',
        },
         {
          name: 'area_atendimento', label: 'Area Atendimento', field: 'area_atendimento', align: 'center',
        },
        {
          name: 'retorno', label: 'Confirmado com Cliente', field: 'retorno', align: 'center',
        },
        {
          name: 'action', label: 'Opções', field: 'action', align: 'center',
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
     getColorRamo(ramo) {
      return (this.colors.default)();
    },
    edit(item) {
      this.editarAgenda = { ...item };
      this.showModal = true;
    },
     async confirma(item) {
       item.retorno = item.retorno == "Sim" ? "Não" : "Sim"
       await this.AgendaService.createOrUpdate(item);
     // this.load();
     
    },
    editDetalhe(item) {
      this.editarAgenda = { ...item };
      this.showModalDetalhe = true;
    },
    async onSubmit(agenda) {
      await this.AgendaService.createOrUpdate(agenda);
      this.load();
      this.fecharModal();
    },

    async load(page) {
      this.loading = true;
      const data = await this.AgendaService.search({}, page);
      this.loading = false;
      this.lastPage = data.last_page;
      this.currentPage = data.current_page;
      this.agendas = data.data;
    },
    fecharModal() {
      this.showModal = false;
      this.showModalDetalhe = false;
      this.editarAgenda = {};
    },
    showModalDelete(item) {
      this.editarAgenda = item;
      this.showDeleteModal = true;
    },
    async deletar(item) {
      await this.AgendaService.remove(item.id);
      this.showDeleteModal = false;
      this.load();
    },
  },
  mounted() {
    this.load();
  },
};
</script>
