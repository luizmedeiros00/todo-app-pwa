<template>
    <div class="modal-cadastro-subcategoria">
        <q-dialog :value="show" @input="fechar">
            <q-card flat bordered class="my-card" style="width: 700px; max-width: 150vw;">
                <modal-title-component title="Inclusão de Subcategoria" subtitle="" />
    
                <div class="q-pm-auto">
    
                    <q-tabs v-model="tab" align="justify" class="q-mb-xs">
                        <q-tab class="text-orange" name="subcategoria" label="SubCategoria" />
                        <q-tab class="text-orange" name="detalhes" label="Detalhes" />
                    </q-tabs>
    
                    <div class="q-gutter-xs">
                        <q-tab-panels v-model="tab" animated transition-prev="scale" transition-next="scale" class="bg-white text-grey-9 text-left">
    
                            <q-tab-panel name="subcategoria">
                                <div class="text-h6 text-weight-regular" style="margin:20px">Dados Subcategoria</div>
                                <q-card-section>
                                    <input type="hidden" v-model="subcategoria.id" />
                                    <div class="q-gutter-md">
                                        <q-select dense outlined emit-value map-options v-model="subcategoria.categoria_id" :options="categorias" label="Categoria" />
                                        <q-input dense outlined v-model="subcategoria.subcategoria" label="SubCategoria" />
                                    </div>
                                </q-card-section>
                            </q-tab-panel>
    
                            <q-tab-panel name="detalhes">
                                <div class="text-h6 text-weight-regular" style="margin:20px">Detalhes</div>
                                <q-card-section>
                                    <div class="q-gutter-md">
                                        <q-input dense outlined type="textarea" v-model="subcategoria.observacao" label="Observação" />
                                    </div>
                                </q-card-section>
                            </q-tab-panel>
    
                        </q-tab-panels>
                    </div>
                </div>
    
    
    
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
    QTabPanels,
    QTabPanel,
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
        QTabPanels,
        QTabPanel,
    },
    directives: { mask },
    props: ['show', 'edit'],
    data() {
        return {
            subcategoria: {},
            categorias: [],
            tab: 'subcategoria',
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
            this.categorias = data.map(item => ({ label: item.categoria, value: item.id }));
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
