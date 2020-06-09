
<template>
    <q-table class="my-sticky-column-table" dense :rows-per-page-options="[]" :pagination.sync="pagination" card-class="" table-class="bg-grey-1 text-grey-9" table-header-class="text-subtitle1 text-weight-regular text-grey-9 bg-grey-3" :title="titulo" :data="dados"
        :columns="columns" row-key="id" hide-bottom :loading="loading">
        <template v-slot:loading>
              <q-inner-loading
                showing
                color="primary"
              />
      </template>

          <q-td
            slot="body-cell-categoria"
            slot-scope="item"
            :props="item"
          >
            {{item.row.categoria.length > 22 ? `${item.row.categoria.substring(0,20)}...`
              : item.row.categoria}}
          </q-td>

          <q-td
            slot="body-cell-categoria_desc"
            slot-scope="item"
            :props="item"
          >
           <div v-if="item.row.categoria">
              {{item.row.categoria['categoria'].length > 22 ? `${item.row.categoria['categoria'].substring(0,20)}...`
              : item.row.categoria['categoria']}}
           </div>
          </q-td>

           <q-td
            slot="body-cell-subcategoria"
            slot-scope="item"
            :props="item"
          >
           <div v-if="item.row.subcategoria">
            {{item.row.subcategoria.length > 22 ? `${item.row.subcategoria.substring(0,20)}...`
              : item.row.subcategoria}}
            </div>
          </q-td>

          <q-td
            slot="body-cell-fornecedor"
            slot-scope="item"
            :props="item"
          >
             <div v-if="item.row.fornecedor">
            {{item.row.fornecedor.length > 22 ? `${item.row.fornecedor.substring(0,20)}...`
              : item.row.fornecedor}}
              </div>
          </q-td>

            <q-td
            slot="body-cell-fornecedor_prod"
            slot-scope="item"
            :props="item"
          >
             <div v-if="item.row.fornecedor">
            {{item.row.fornecedor['fornecedor'].length > 22 ? `${item.row.fornecedor['fornecedor'].substring(0,20)}...`
              : item.row.fornecedor['fornecedor']}}
              </div>
          </q-td>

           <q-td
            slot="body-cell-subcategoria_prod"
            slot-scope="item"
            :props="item"
          >
             <div v-if="item.row.subcategoria">
             {{item.row.subcategoria['subcategoria'].length > 22 ? `${item.row.subcategoria['subcategoria'].substring(0,20)}...`
              : item.row.subcategoria['subcategoria']}}
              </div>
          </q-td>

          <q-td
            slot="body-cell-cargo_funcionario"
            slot-scope="item"
            :props="item"
          >
               <div v-if="item.row.cargo">
            {{item.row.cargo['cargo'].length > 22 ? `${item.row.cargo['cargo'].substring(0,20)}...`
              : item.row.cargo['cargo']}}
              </div>
          </q-td>
           

          <q-td
          slot="body-cell-action"
          slot-scope="item"
          :props="item"
          >
             <slot name="acoes" :props="item"></slot>
          </q-td>

       </q-table>

</template>

<script>
import {
    QPage,
    QTable,
    QPageSticky,
    QInnerLoading,
} from 'quasar';
import { mapGetters } from 'vuex';
import DinheiroFilter from '../../filter/dinheiro';
import DataFilter from '../../filter/data';
import TableComponent from '../../components/table/TableComponent';
import ModalDelete from '../../components/modal/ModalDelete';
import Paginacao from '../../components/table/Paginate';


export default {
    name: 'TableComponent',
    computed: { ...mapGetters('user', ['nomeUser', 'isAdmin', 'isCoordenador']) },
    props: ['columns', 'dados', 'titulo'],
    components: {
        TableComponent,
        QPage,
        QTable,
        QPageSticky,
        Paginacao,
        QInnerLoading,
    },

    data() {
        return {
            pagination: {
                page: 1,
                rowsPerPage: 0,

            },

            loading: false,
            currentPage: 0,
            lastPage: 0,

            colors: {
                Administrador: () => 'primary',
                Coordenador: () => 'amber',
                Usuario: () => 'grey',
                default: () => 'red',
            },
        };
    },

};
</script>

<style lang="sass">
.my-sticky-column-table
 

  thead tr:nth-child(1) th:nth-child(1)
    background-color: #fff

  td:nth-child(1)
    background-color: #f5f5dc

  th:nth-child(1),
  td:nth-child(1)
    position: sticky
    left: 0
    z-index: 1


</style>
