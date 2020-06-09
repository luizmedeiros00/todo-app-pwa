<template>
    <div class="lista-clientes">
        <q-page padding>
            <template>
                    <q-card class="q-mb-md" flat bordered >
                       <title-section-component title1="Clientes" title2="Clientes" />
                         <q-card-actions align="right" class="q-mr-sm" style="margin-top:-55px" >
                             <q-btn @click="showModal = true"  icon="add" color="primary">Adicionar</q-btn>
                         </q-card-actions>
                        <q-card-section>
                            <div class="q-pb-xs">
                                <q-list bordered class="rounded-borders">
                                    <q-expansion-item
                                        expand-separator
                                        icon="search"
                                        label="Localizar"
                                        caption="Filtro(s) de busca"
                                    >
                                        <q-card bordered>
                                            <q-card-section>
                                            <div class="q-gutter-md">

                                                <q-input bottom-slots
                                                  outlined
                                                  v-model="filtro.cliente"
                                                  label="Nome"
                                                  dense
                                                >
                                                    <template v-slot:append>
                                                        <q-icon v-if="filtro.cliente !== ''"
                                                          name="close"
                                                          @click="filtro.cliente = ''"
                                                          class="cursor-pointer"
                                                         />

                                                        <q-icon name="search"
                                                          @click.prevent="getDados(filtro)"
                                                          class="cursor-pointer"
                                                        />
                                                    </template>
                                                </q-input>
                                             </div>
                                        </q-card-section>
                                    </q-card>
                                </q-expansion-item>
                            </q-list>
                        </div>
                    </q-card-section>
                </q-card>
            </template>
            <table-component :columns="columns" :dados="clientes" :titulo="titulo">
              <template v-slot:acoes="{props}">
                <div class="q-sm q-gutter-sm">
                  <q-btn @click="edit(props.row)" color="warning" flat icon="edit" size="md" />
                  <q-btn @click="showModalDelete(props.row)" color="red" flat icon="delete" size="md" />
                  <q-btn @click="editDetalhe(props.row)" color="gray" flat placeholder="Detalhes do cliente" icon="chat" size="sm" />
                </div>
              </template>
            </table-component>

            <paginacao :last_page="lastPage" :current_page="currentPage" @input="load($event)" />

            <!--
            <q-page-sticky position="bottom-right" :offset="[18, 18]">
                <q-btn @click="showModal = true" fab icon="add" color="primary" />
            </q-page-sticky>
            -->
            <q-inner-loading :showing="loading">
                <q-spinner-gears size="50px" color="primary" />
            </q-inner-loading>
        </q-page>

        <modal-cadastro
        :edit="editarClientes"
        :show="showModal"
        @fechar="fecharModal"
        @salvar="onSubmit($event)"
         />

      <modal-detalhe
      :edit="editarClientes"
      :show="showModalDetalhe"
      @fechar="fecharModal"
      @salvar="onSubmit($event)"
    />
        <modal-delete
        :dialog="showDeleteModal"
        @fechar="showDeleteModal = false"
        @deletar="deletar($event)"
        :item="editarClientes"
         />

    </div>
</template>

<script>
import {
  QPage,
  QTable,
  QPageSticky,
  QInnerLoading,
} from 'quasar';
import { mapGetters } from 'vuex';
import ClienteService from '../../service/Cliente/ClienteService';
import ModalCadastro from './ModalCadastro';
import ModalDetalhe from './Detalhes';
import ModalDelete from '../../components/modal/ModalDelete';
import Paginacao from '../../components/table/Paginate';
import TableComponent from '../../components/table/TableComponent';
import TitleSectionComponent from '../../components/cards/TitleSectionComponent';

export default {
  name: 'ListaCliente',
  components: {
    TableComponent,
    QPage,
    QTable,
    QPageSticky,
    ModalCadastro,
    ModalDelete,
    ModalDetalhe,
    Paginacao,
    QInnerLoading,
    TitleSectionComponent,
  },

  computed: { ...mapGetters('user', ['nomeUser', 'isAdmin', 'isCoordenador']) },

  data() {
    return {
      titulo: '',
      filtro: {},
      loading: false,
      currentPage: 0,
      lastPage: 0,
      ClienteService: new ClienteService(),
      showModal: false,
      showDeleteModal: false,
      showModalDetalhe: false,
      editarClientes: {},
      clientes: [],
      columns: [{
        name: 'id',
        style: 'min-width: 15px; width: 15px',
        label: 'Cod.',
        field: 'id',
        align: 'center',
      },
      {
        name: 'cliente',
        sortable: true,
        label: 'Cliente',
        field: 'nome',
        align: 'left',
      },
      
      {
        name: 'cpfcnpj',
        sortable: true,
        label: 'Cpf/Cnpj',
        field: 'cpf_cnpj',
        align: 'left',
      },
     
      {
        name: 'telefone',
        sortable: true,
        label: 'Telefone',
        field: 'telefone',
        align: 'left',
      },
       {
        name: 'email',
        sortable: true,
        label: 'Email',
        field: 'email',
        align: 'left',
      },
      {
        name: 'action',
        label: 'Ações',
        field: 'action',
        align: 'center',
        style: 'min-width: 15px; width: 15px',
      },
      ],
      pagination: {
        page: 1,
        rowsPerPage: 0, // 0 means all rows
      },
    };
  },
  methods: {
    async getDados(filtro) {
      this.loading = true;
      const data = await this.ClienteService.search(filtro);
      this.loading = false;
      this.clientes = data.data;
    },
    edit(item) {
      this.editarClientes = { ...item };
      this.showModal = true;
    },
    editDetalhe(item) {
      this.editarClientes = { ...item };
      this.showModalDetalhe = true;
    },
    async onSubmit(subcategoria) {
      this.loading = true;
      await this.ClienteService.createOrUpdate(subcategoria);
      this.loading = false;
      this.notify();
      this.load();
      this.onReset();
      this.fecharModal();
    },
    async load(page) {
      this.loading = true;
      const data = await this.ClienteService.search({}, page);
      this.loading = false;
      this.lastPage = data.last_page;
      this.currentPage = data.current_page;
      this.clientes = data.data;
    },
    onReset() {
      this.clientes = [];
    },
    fecharModal() {
      this.editarClientes = {};
      this.showModal = false;
      this.showModalDetalhe = false;
    },

    showModalDelete(item) {
      this.editarClientes = item;
      this.showDeleteModal = true;
    },
    async deletar(item) {
      this.loading = true;
      await this.ClienteService.remove(item.id);
      this.loading = false;
      this.showDeleteModal = false;
      this.load();
      this.notify();
    },
    notify() {
      this.$q.notify({
        message: 'Operação realizada com sucesso!',
        color: 'green',
      });
    },
  },
  mounted() {
    this.load();
  },
};
</script>
