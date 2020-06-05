<template>
    <div class="modal-cadastro-categoria">
        <q-dialog :value="show" @input="fechar">
            <q-card class="my-card" style="width: 700px; max-width: 150vw;">
                <modal-title-component title="Inclusão de Categoria" subtitle="" />
                <q-card-section>
                    <q-form>
                        <input type="hidden" v-model="categoria.id" />
                        <div class="q-gutter-md">
                            <q-input outlined v-model="categoria.categoria" label="Categoria" />
    
                        </div>
                    </q-form>
                </q-card-section>
    
                <q-card-actions align="right" class="bg-white text-teal">
                    <q-btn class="q-mt-md" color="grey" label="Fechar" @click="fechar" />
                    <q-btn label="Salvar" @click="salvar" type="submit" class="q-mt-md" color="primary" />
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

import ModalTitleComponent from '../../components/modal/ModalTitleComponent';

export default {
    name: 'ModalCadastroCategoria',
    components: {
        ModalTitleComponent,
        QDialog,
        QForm,
    },
    directives: { mask },
    props: ['show', 'edit'],
    data() {
        return {
            categoria: {},



        };
    },
    methods: {
        salvar() {
            this.$emit('salvar', this.categoria);
        },
        fechar() {
            this.$emit('fechar');
        },


    },

    watch: {
        edit(newEdit) {
            this.categoria = { ...newEdit };
        },
    },
};
</script>
