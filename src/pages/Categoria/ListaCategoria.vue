<template>
    <div class="lista-categoria">
        <q-page padding>
            <table-component :columns="columns" :dados="categorias" :titulo="titulo">
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
           <q-inner-loading :showing="loading">
                <q-spinner-gears size="50px" color="primary" />
            </q-inner-loading>
        <footer-component />
        </q-page>
        <modal-cadastro :edit="editarCategoria" :show="showModal" @fechar="fecharModal" @salvar="onSubmit($event)" />
        <modal-delete :dialog="showDeleteModal" @fechar="showDeleteModal = false" @deletar="deletar($event)" :item="editarCategoria" />
    </div>
</template>

<script>
import {
    QPage,
    QTable,
    QPageSticky,
    QInnerLoading

} from 'quasar';
import { mapGetters } from 'vuex';
import CategoriaService from '../../service/Categoria/CategoriaService';
import ModalCadastro from './ModalCadastro';
import ModalDelete from '../../components/modal/ModalDelete';
import Paginacao from '../../components/table/Paginate';
import FooterComponent from '../../components/footer/Footer';
import TableComponent from '../../components/table/TableComponent';

export default {
    name: 'Listacategoria',
    components: {
        TableComponent,
        QPage,
        QTable,
        QPageSticky,
        ModalCadastro,
        ModalDelete,
        Paginacao,
        FooterComponent,
        QInnerLoading,
    },

    computed: { ...mapGetters('user', ['nomeUser', 'isAdmin', 'isCoordenador']) },

    data() {
        return {
            titulo: "",
            loading: false,
            currentPage: 0,
            lastPage: 0,
            CategoriaService: new CategoriaService(),
            showModal: false,
            showDeleteModal: false,
            editarCategoria: {},
            categorias: [],
            columns: [{
                    name: 'id',
                    style: 'min-width: 15px; width: 15px',
                    label: '',
                    field: 'id',
                    align: 'center',
                },
                {
                    name: 'categoria',
                    sortable: true,
                    label: 'Categoria',
                    field: 'categoria',
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
            this.editarCategoria = { ...item };
            this.showModal = true;
        },
        async onSubmit(categoria) {
            await this.CategoriaService.createOrUpdate(categoria);
            this.notify();
            this.load();
            this.onReset();
            this.fecharModal();
        },
        async load(page) {
            this.loading = true;
            const data = await this.CategoriaService.search({}, page);
            this.loading = false;
            this.lastPage = data.last_page;
            this.currentPage = data.current_page;
            this.categorias = data.data;
        },
        onReset() {
            this.categoria = {};
        },
        fecharModal() {
            this.editarCategoria = {};
            this.showModal = false;
        },

        showModalDelete(item) {
            this.editarCategoria = item;
            this.showDeleteModal = true;
        },
        async deletar(item) {
            await this.CategoriaService.remove(item.id);
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
