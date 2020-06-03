<template>
    <div class="modal-cadastro-agenda">
        <q-dialog :value="show" @input="fechar">
            <q-card style="width: 700px; max-width: 100vw;">
                <q-card-section class="bg-orange text-white">
                    <div class="text-h6">Novo Agendamento</div>
                </q-card-section>
    
                <q-card-section>
                    <q-form>
                        <div class="q-gutter-md">
    
    
    
                            <q-input outlined type="date" fill-mask v-model="agenda.dataagendamento" label="Data Agendamento" />
    
    
                            <q-input outlined v-model="agenda.horaagendamento" label="Hora" v-mask="['##:##']" >
    <template v-slot:append>
          <q-icon v-if="text !== ''" name="close" @click="text = ''" class="cursor-pointer" />
          <q-icon name="schedule" />
        </template>
                            </q-input>

    
                            <q-select filled v-model="agenda.area_atendimento" :options="areaAtendimnto" label="Area de Atendimento" />
    
                            <q-input outlined type="textarea" v-model="agenda.descricao" label="Observações" />
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
import { mask } from 'vue-the-mask';
import { QDialog, QForm } from 'quasar';
import { mapGetters } from 'vuex';
import ClienteService from '../../service/Cliente/ClienteService';
import UsuarioService from '../../service/Usuario/UsuarioService';


export default {
    name: 'ModalCadastroAgenda',
    directives: { mask },
    components: {
        QDialog,
        QForm,
    },
    computed: { ...mapGetters('user', ['nomeUser', 'isAdmin', 'isCoordenador', 'isCliente']) },
    props: ['show', 'edit'],
    data() {
        return {
            clientes: [],
            ClienteService: new ClienteService(),
            UsuarioService: new UsuarioService(),
            retorno: ['Sim', 'Não'],
            areaAtendimnto: ['Trabalhista', 'Contratual', 'Societária', 'Tributária', 'Cível', 'Falimentar', 'Energia', 'Público e Licitações'],
            agenda: {},
            cliente_id: '',
        };
    },
    methods: {

        async getClienteId(page) {
            console.log(this.isCliente);
            const dataUsuario = await this.UsuarioService.search({ 'email': this.isCliente }, page);
            this.agenda.cliente_id = dataUsuario.data[0].cliente_id;
            console.log(this.agenda);
        },

        salvar() {
            this.getClienteId();

            this.$emit('salvar', this.agenda);
        },
        fechar() {
            this.$emit('fechar');
        },
        async loadClientes() {
            const data = await this.ClienteService.list();
            this.clientes = data.data.map(item => ({ label: item.nome, value: item.id }));
        },

    },

    mounted() {
        this.loadClientes();
         this.getClienteId();
    },

    watch: {
        edit(newEdit) {

            this.agenda = { ...newEdit };
        },
    },
};
</script>
