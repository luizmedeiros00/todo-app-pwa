<template>
    <div class="lista-subcategorias">
        <q-page padding>
            <table-component :columns="columns" :dados="subcategorias" :titulo="titulo">
                <template v-slot:acoes="{props}">
                         <div class="q-sm q-gutter-sm"> 
                            <q-btn
                            @click="edit(props.row)"
                            color="warning"
                            flat
                            icon="edit"
                            size="md"
                            />
                            <q-btn
                            @click="showModalDelete(props.row)"
                            color="red"              
                            flat
                            icon="delete"  
                            size="md"          
                            />    
                             <!--                           
                            <q-btn
                            @click="editDetalhe(props.row)"
                            color="gray"
                            flat
                            placeholder="Detalhes da Categoria"
                            icon="chat"
                            size="sm"
                            />
                            -->
                            </div>
</template>
            </table-component>
            <paginacao :last_page="lastPage" :current_page="currentPage" @input="load($event)" />
            <q-page-sticky position="bottom-right" :offset="[18, 18]">
                <q-btn @click="showModal = true" fab icon="add" color="primary" />
            </q-page-sticky>
        </q-page>
        <modal-cadastro :edit="editarSubCategoria" :show="showModal" @fechar="fecharModal" @salvar="onSubmit($event)" />
        <modal-delete :dialog="showDeleteModal" @fechar="showDeleteModal = false" @deletar="deletar($event)" :item="editarSubCategoria" />
      
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
import SubCategoriaService from '../../service/SubCategoria/SubCategoriaService';
import ModalCadastro from './ModalCadastro';
import ModalDelete from '../../components/modal/ModalDelete';
import Paginacao from '../../components/table/Paginate';
import TableComponent from '../../components/table/TableComponent';

export default {
    name: 'ListaSubcategoria',
    components: {
        TableComponent,
        QPage,
        QTable,
        QPageSticky,
        ModalCadastro,
        ModalDelete,
        Paginacao,
        QInnerLoading,
    },

    computed: { ...mapGetters('user', ['nomeUser', 'isAdmin', 'isCoordenador']) },

    data() {
        return {
            titulo: "",
            loading: false,
            currentPage: 0,
            lastPage: 0,
            SubCategoriaService: new SubCategoriaService(),
            showModal: false,
            showDeleteModal: false,
            editarSubCategoria: {},
            subcategorias: [],
            columns: [{
                    name: 'id',
                    style: 'min-width: 15px; width: 15px',
                    label: '',
                    field: 'id',
                    align: 'center',
                },
                {
                    name: 'categoria_desc',
                    sortable: true,
                    label: 'Categoria',
                    field: 'categoria',
                    align: 'left',
                },
                {
                    name: 'subcategoria',
                    sortable: true,
                    label: 'SubCategoria',
                    field: 'subcategoria',
                    align: 'left',
                },
                {
                    name: 'action',
                    label: 'Ação',
                    field: 'action',
                    align: 'center',
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
            this.editarSubCategoria = { ...item };
            this.showModal = true;
        },
        async onSubmit(subcategoria) {
            await this.SubCategoriaService.createOrUpdate(subcategoria);
            this.notify();
            this.load();
            this.onReset();
            this.fecharModal();
        },
        async load(page) {
            this.loading = true;
            const data = await this.SubCategoriaService.search({}, page);
            this.loading = false;
            this.lastPage = data.last_page;
            this.currentPage = data.current_page;
            this.subcategorias = data.data;
        },
        onReset() {
            this.subcategorias = {};
        },
        fecharModal() {
            this.editarSubCategoria = {};
            this.showModal = false;
        },

        showModalDelete(item) {
            this.editarSubCategoria = item;
            this.showDeleteModal = true;
        },
        async deletar(item) {
            await this.SubCategoriaService.remove(item.id);
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
