<template>
    <div class="modal-cadastro-cliente">
        <q-dialog :value="show" @input="fechar">
            <q-card flat bordered class="my-card" style="width: 700px; max-width: 150vw;">
                <modal-title-component title="Inclusão de Cliente" subtitle="" />
    
                <div class="q-pm-auto">
    
                    <q-tabs v-model="tab" align="justify" class="q-mb-xs">
                        <q-tab class="text-orange" name="cliente" label="Cliente" />
                        <q-tab class="text-orange" name="detalhes" label="Detalhes" />
                    </q-tabs>
    
                    <div class="q-gutter-xs">
                        <q-tab-panels v-model="tab" animated transition-prev="scale" transition-next="scale" class="bg-white text-grey-9 text-left">
    
                            <q-tab-panel name="cliente">
                                <div class="text-h6 text-weight-regular" style="margin:20px">Dados Subcliente</div>
                                <q-card-section>
                                   <q-form>
                                    <input type="hidden" v-model="cliente.id" />
                                    <div class="q-gutter-md">
                                        <q-input dense outlined v-model="cliente.nome" label="cliente" />
                                        <q-input dense outlined v-model="cliente.cpf_cnpj"  v-mask="['###.###.###-##', '##.###.###/####-##']" label="CPF/CNPJ" />
                                        <q-input dense outlined v-model="cliente.endereco" label="Endereco" />
                                        <q-input dense outlined v-model="cliente.email" label="Email" />
                                        <q-input dense outlined v-model="cliente.telefone" label="Telefone" />
                                     </div>
                                </q-form>
                                </q-card-section>
                            </q-tab-panel>
    
                            <q-tab-panel name="detalhes">
                                <div class="text-h6 text-weight-regular" style="margin:20px">Detalhes</div>
                                <q-card-section>
                                    <div class="q-gutter-md">
                                        <q-input dense outlined type="textarea" v-model="cliente.observacao" label="Observação" />
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
} from 'quasar';
import { mask } from 'vue-the-mask';
import ClienteService from '../../service/Cliente/ClienteService';
import ModalTitleComponent from '../../components/modal/ModalTitleComponent';


export default {
  name: 'ModalCadastrocliente',
  components: {
    ModalTitleComponent,
    QDialog,
    QForm,
  },
  directives: { mask },
  props: ['show', 'edit'],
  data() {
    return {
      tab:'cliente',
      cliente: {},
      clientes: [],
      ClienteService: new ClienteService(),
    };
  },
  methods: {
    salvar() {
      this.$emit('salvar', this.cliente);
    },
    fechar() {
      this.$emit('fechar');
    },
    async loadclientes() {
      const data = await this.clienteservice.list();
      this.clientes = data.map(item => ({ label: item.cliente, value: item.id }));
    },
  },
  mounted() {
    //this.loadclientes();
  },
  watch: {
    edit(newEdit) {
      this.cliente = { ...newEdit };
    },
  },
};
</script>
