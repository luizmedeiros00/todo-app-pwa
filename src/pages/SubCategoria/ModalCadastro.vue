<template>
    <div class="modal-cadastro-subcategoria">
        <q-dialog :value="show" @input="fechar">
            <q-card flat bordered class="my-card" style="width: 700px; max-width: 150vw;">
                <modal-title-component title="Inclusão de Subcategoria" subtitle="" />
                <q-card-section>
                    <q-form>
                        <input type="hidden" v-model="subcategoria.id" />
                        <div class="q-gutter-md">
                            <q-select emit-value map-options filled v-model="subcategoria.categoria_id" :options="categorias" label="Categoria" />
                            <q-input outlined v-model="subcategoria.subcategoria" label="SubCategoria" />
                        </div>
                    </q-form>
                </q-card-section>
    
                <q-card-actions align="right" class="bg-white-1">
                    <q-btn class="q-mt-sm" color="grey" label="Fechar" @click="fechar" />
                    <q-btn label="Salvar" @click="salvar" type="submit" class="q-mt-sm" color="primary" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
import {
    QDialog,
    QForm,
} from 'quasar';
import { mask } from 'vue-the-mask';
import CategoriaService from '../../service/Categoria/CategoriaService';
import ModalTitleComponent from '../../components/modal/ModalTitleComponent';
export default {
    name: 'ModalCadastroSubCategoria',
    components: {
        ModalTitleComponent,
        QDialog,
        QForm,
    },
    directives: { mask },
    props: ['show', 'edit'],
    data() {
        return {
            subcategoria: {},
            categorias: [],
            CategoriaService: new CategoriaService(),
        };
    },
    methods: {
        salvar() {
            this.$emit('salvar', this.subcategoria);
        },
        fechar() {
            this.$emit('fechar');
        },


        async loadCategorias() {
            const data = await this.CategoriaService.list();
            this.categorias = data.data.map(item => ({ label: item.categoria, value: item.id }));
        },
    },
    mounted() {
        this.loadCategorias();
    },
    watch: {
        edit(newEdit) {
            this.subcategoria = { ...newEdit };
        },
    },
};
</script>
