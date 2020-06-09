<template>
    <div class="lista-cargo">
        <q-page padding>
            <template>
                <q-card class="q-mb-md" flat bordered >
                   <title-section-component title1="Funcionario" title2="Cargos" />
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
                                            <q-input bottom-slots
                                              dense
                                             outlined
                                              v-model="filtro.cargo"
                                              label="Cargo"
                                            >

                                                <template v-slot:append>
                                                    <q-icon v-if="filtro.cargo !== ''"
                                                      name="close"
                                                      @click="filtro.cargo = ''"
                                                      class="cursor-pointer"
                                                     />

                                                    <q-icon name="search"
                                                      @click.prevent="getDados(filtro)"
                                                      class="cursor-pointer"
                                                    />
                                                </template>
                                            </q-input>
                                        </q-card-section>
                                    </q-card>
                                </q-expansion-item>
                            </q-list>
                        </div>
                    </q-card-section>
                </q-card>
            </template>
            <table-component :columns="columns" :dados="cargos" :titulo="titulo">
                <template v-slot:acoes="{props}">
                    <div class="q-sm q-gutter-sm">
                        <q-btn
                          @click="edit(props.row)"
                          color="warning"
                          flat icon="edit"
                          size="md"
                        />
                        <q-btn
                          @click="showModalDelete(props.row)"
                          color="red"
                          flat icon="delete"
                          size="md"
                        />
                        
                        <q-btn
                        @click="editDetalhe(props.row)"
                        color="gray"
                        flat
                        placeholder="Detalhes da Cargo"
                        icon="chat"
                        size="sm"
                        />
                        
                    </div>
                </template>
            </table-component>
            <paginacao :last_page="lastPage" :current_page="currentPage" @input="load($event)" />
            <!--
            <q-page-sticky position="bottom-right" :offset="[20, 20]">
                <q-btn @click="showModal = true"  icon="add" color="primary"/>
            </q-page-sticky>
            -->
            <q-inner-loading :showing="loading">
                <q-spinner-gears size="50px" color="primary" />
            </q-inner-loading>

            <footer-component />
        </q-page>

        <modal-cadastro
          :edit="editarCargo"
          :show="showModal"
          @fechar="fecharModal"
          @salvar="onSubmit($event)"
        />
          <modal-detalhe
      :edit="editarCargo"
      :show="showModalDetalhe"
      @fechar="fecharModal"
      @salvar="onSubmit($event)"
    />

        <modal-delete
          :dialog="showDeleteModal"
          @fechar="showDeleteModal = false"
          @deletar="deletar($event)"
          :item="editarCargo"
        />
    </div>
</template>

<script>
import {
  QPage,
  QPageSticky,
  QInnerLoading,

} from 'quasar';
import { mapGetters } from 'vuex';
import CargoService from '../../service/Cargo/CargoService';
import ModalCadastro from './ModalCadastro';
import ModalDetalhe from './Detalhes';
import ModalDelete from '../../components/modal/ModalDelete';
import Paginacao from '../../components/table/Paginate';
import FooterComponent from '../../components/footer/Footer';
import TableComponent from '../../components/table/TableComponent';
import TitleSectionComponent from '../../components/cards/TitleSectionComponent';
export default {
  name: 'Listacargo',
  components: {
    TableComponent,
    QPage,
    QPageSticky,
    ModalCadastro,
    ModalDelete,
    ModalDetalhe,
    Paginacao,
    FooterComponent,
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
      CargoService: new CargoService(),
      showModal: false,
      showDeleteModal: false,
      showModalDetalhe:false,
      editarCargo: {},
      cargos: [],
      columns: [{
        name: 'id',
        style: 'min-width: 15px; width: 15px',
        label: 'Cod.',
        field: 'id',
        align: 'center',
      },
      {
        name: 'cargo',
        sortable: true,
        label: 'Cargo',
        field: 'cargo',
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
      const data = await this.CargoService.search(filtro);
      this.cargos = data.data;
    },
    edit(item) {
      this.editarCargo = { ...item };
      this.showModal = true;
    },
     editDetalhe(item) {
      this.editarCargo = { ...item };
      this.showModalDetalhe = true;
    },
    async onSubmit(cargo) {
      this.loading = true;
      await this.CargoService.createOrUpdate(cargo);
      this.loading = false;
      this.notify();
      this.load();
      this.onReset();
      this.fecharModal();
    },
    async load(page) {
      this.loading = true;
      const data = await this.CargoService.search({}, page);
      this.loading = false;
      this.lastPage = data.last_page;
      this.currentPage = data.current_page;
      this.cargos = data.data;
    },
    onReset() {
      this.cargo = [];
    },
    fecharModal() {
      this.editarCargo = {};
      this.showModal = false;
      this.showModalDetalhe = false;
    },

    showModalDelete(item) {
      this.editarCargo = item;
      this.showDeleteModal = true;
    },
    async deletar(item) {
      this.loading = true;
      await this.CargoService.remove(item.id);
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
