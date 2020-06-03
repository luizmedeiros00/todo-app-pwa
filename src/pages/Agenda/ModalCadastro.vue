<template>
  <div class="modal-cadastro-agenda">
    <q-dialog :value="show" @input="fechar">
      <q-card style="width: 700px; max-width: 100vw;">
        <q-card-section class="bg-orange text-white">
          <div class="text-h6">Novo Agendamento</div>
        </q-card-section>

        <q-card-section >
          <q-form>
            <div class="q-gutter-md">
              <q-input
                outlined
                type="date"

                fill-mask
                v-model="agenda.dataagendamento"
                label="Data Agendamento"
              />
             
            
             
              <q-input outlined v-model="agenda.horaagendamento" label="Hora"
               v-mask="['##:##']" />
              <q-select
                emit-value
                map-options
                filled
                v-model="agenda.cliente_id"
                :options="clientes"
                label="Clientes"
              />
              <q-select filled v-model="agenda.area_atendimento" :options="areaAtendimnto" label="Area de Atendimento" />
             <q-select filled v-model="agenda.retorno" :options="retorno" label="Confirmado com cliente" />
           
            
              <q-input outlined type="textarea" v-model="agenda.descricao" label="Observações" />
            </div>
          </q-form>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn
            class="q-mt-md"
            color="grey"
           label="Fechar"
           @click="fechar"

           />
          <q-btn
            label="Salvar"
            @click="salvar"
            type="submit"
            class="q-mt-md"
            color="primary"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { QDialog, QForm } from 'quasar';
import ClienteService from '../../service/Cliente/ClienteService';
import { mask } from 'vue-the-mask';

export default {
  name: 'ModalCadastroAgenda',
   directives: { mask },
  components: {
    QDialog,
    QForm,
  },
  props: ['show', 'edit'],
  data() {
    return {
      clientes: [],
      ClienteService: new ClienteService(),
      retorno: ['Sim', 'Não'],
        areaAtendimnto: ['Trabalhista', 'Contratual', 'Societária', 'Tributária', 'Cível', 'Falimentar', 'Energia', 'Público e Licitações'],
      agenda: {},
    };
  },
  methods: {
    salvar() {
      this.$emit('salvar', this.agenda);
    },
    fechar() {
      this.$emit('fechar');
    },
    async loadClientes() {
      const data = await this.ClienteService.list();
      this.clientes = data.data.map(item => ({ label: item.razao_social, value: item.id }));
    },
   
  },
  mounted() {
    this.loadClientes();
 
  },
  watch: {
    edit(newEdit) {
      this.agenda = { ...newEdit };
    },
  },
};
</script>
