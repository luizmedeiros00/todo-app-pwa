<template>
    <div class="modal-detalhe">
        <q-dialog :value="show" @input="fechar">
            <q-card flat bordered class="my-card" style="width: 700px; max-width: 150vw;">
                <modal-title-component title="Detalhes" subtitle="" />
        
                    <q-card-section class="q-pt-none">
                        <q-form>
                            <div class="q-gutter-md">
    
                                <q-input outlined type="textarea" v-model="cliente.observacao" label="Observações" />
                            </div>
                        </q-form>
                    </q-card-section>
    
                    <q-card-actions align="right" class="bg-white text-teal">
                        <q-btn class="q-mt-md" color="grey" label="Fechar" @click="fechar" />
    
                    </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
import { QDialog, QForm } from 'quasar';
import ModalTitleComponent from '../../components/modal/ModalTitleComponent';


export default {
  name: 'ModalDetalhecliente',
  components: {
    QDialog,
    QForm,
    ModalTitleComponent,
  },
  props: ['show', 'edit'],
  data() {
    return {
      cliente: {},
    };
  },
  methods: {
    salvar() {
      this.$emit('salvar', this.cliente);
    },
    fechar() {
      this.$emit('fechar');
    },
  },
  mounted() {},
  watch: {
    edit(newEdit) {
      this.cliente = { ...newEdit };
    },
  },
};
</script>
