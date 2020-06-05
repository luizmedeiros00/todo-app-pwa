<template>
    <q-table dense :rows-per-page-options="[]" :pagination.sync="pagination" card-class="" table-class="bg-grey-1 text-grey-9" table-header-class="text-subtitle1 text-weight-regular text-grey-9 bg-grey-3" :title="titulo" :data="dados" :columns="columns"
        row-key="id" hide-bottom :loading="loading">
    
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
            {{item.row.categoria['categoria']}}
          </q-td>

           <q-td
            slot="body-cell-subcategoria"
            slot-scope="item"
            :props="item"
          >
            {{item.row.subcategoria.length > 22 ? `${item.row.subcategoria.substring(0,20)}...`
              : item.row.subcategoria}}
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
    name: "TableComponent",
    computed: { ...mapGetters('user', ['nomeUser', 'isAdmin', 'isCoordenador']) },
    props: ["columns", "dados", "titulo"],
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
            }
        }
    }

}
</script>

<style scoped>
.personalizada {
    height: 10px;
}
</style>