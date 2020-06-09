<template>
    <div class="modal-cadastro-categoria">
        <q-dialog :value="show" @input="fechar">
            <q-card flat bordered class="my-card" style="width: 700px; max-width: 150vw;">
                <modal-title-component title="Inclusão de Subcategoria" subtitle="" />
    
                <div class="q-pm-auto">
    
                    <q-tabs v-model="tab" align="justify" class="q-mb-xs">
                        <q-tab class="text-orange" name="categoria" label="Categoria" />
                        <q-tab class="text-orange" name="detalhes" label="Detalhes" />
                    </q-tabs>
    
                    <div class="q-gutter-xs">
                        <q-tab-panels v-model="tab" animated transition-prev="scale" transition-next="scale" class="bg-white text-grey-9 text-left">
    
                            <q-tab-panel name="categoria">
                                <div class="text-h6 text-weight-regular" style="margin:20px">Dados categoria</div>
                                <q-card-section>
                                    <input type="hidden" v-model="categoria.id" />
                                    <div class="q-gutter-md">
                                        <q-input dense outlined v-model="categoria.categoria" label="Categoria" />
                                    </div>
                                </q-card-section>
                            </q-tab-panel>
    
                            <q-tab-panel name="detalhes">
                                <div class="text-h6 text-weight-regular" style="margin:20px">Detalhes</div>
                                <q-card-section>
                                    <div class="q-gutter-md">
                                        <q-input dense outlined type="textarea" v-model="categoria.observacao" label="Observação" />
                                    </div>
                                </q-card-section>
                            </q-tab-panel>
    
                        </q-tab-panels>
                    </div>
                </div>
    
    

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
  QTabPanels,
  QTabPanel,
} from 'quasar';
import { mask } from 'vue-the-mask';

import ModalTitleComponent from '../../components/modal/ModalTitleComponent';

export default {
  name: 'ModalCadastroCategoria',
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
      categoria: {},
      tab: 'categoria',


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
