<template>
    <div class="modal-cadastro-fornecedor">
        <q-dialog :value="show" @input="fechar">
            <q-card flat bordered class="my-card" style="width: 700px; max-width: 150vw;">
                <modal-title-component title="Inclusão de Fornecedor" subtitle="" />
                <q-card-section>
                    <q-form>
                        <input type="hidden" v-model="fornecedor.id" />
                        <div class="q-gutter-md">
                            <q-input dense outlined v-model="fornecedor.fornecedor" label="Fornecedor" />
                            <q-input dense outlined v-model="fornecedor.razao_social" label="Razão Social" />
                            <q-input dense outlined v-model="fornecedor.cpf_cnpj"  v-mask="['###.###.###-##', '##.###.###/####-##']" label="CPF/CNPJ" />
                            <q-input dense outlined v-model="fornecedor.contato" label="Contato" />
                            <q-input dense outlined v-model="fornecedor.telefone" label="Telefone" />
                            <q-input outlined type="textarea" v-model="fornecedor.observacao" label="Observação" />
      
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
import FornecedorService from '../../service/Fornecedor/FornecedorService';
import ModalTitleComponent from '../../components/modal/ModalTitleComponent';


export default {
  name: 'ModalCadastroFornecedor',
  components: {
    ModalTitleComponent,
    QDialog,
    QForm,
  },
  directives: { mask },
  props: ['show', 'edit'],
  data() {
    return {
      fornecedor: {},
      fornecedores: [],
      FornecedorService: new FornecedorService(),
    };
  },
  methods: {
    salvar() {
      this.$emit('salvar', this.fornecedor);
    },
    fechar() {
      this.$emit('fechar');
    },
    async loadfornecedores() {
      const data = await this.fornecedoreservice.list();
      this.fornecedores = data.map(item => ({ label: item.fornecedor, value: item.id }));
    },
  },
  mounted() {
    //this.loadfornecedores();
  },
  watch: {
    edit(newEdit) {
      this.fornecedor = { ...newEdit };
    },
  },
};
</script>
