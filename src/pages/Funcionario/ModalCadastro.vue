<template>
    <div class="modal-cadastro-funcionario">
        <q-dialog :value="show" @input="fechar">
            <q-card flat bordered class="my-card" style="width: 700px; max-width: 150vw;">
                <modal-title-component title="Inclusão de Funcionario" subtitle="" />
    
                <div class="q-pm-auto">
    
                    <q-tabs v-model="tab" align="justify" class="q-mb-xs">
                        <q-tab class="text-orange" name="funcionario" label="funcionario" />
                        <q-tab class="text-orange" name="endereco" label="Endereço" />
                        <q-tab class="text-orange" name="detalhes" label="Detalhes" />
                    </q-tabs>
    
                    <div class="q-gutter-xs">
                        <q-tab-panels v-model="tab" animated transition-prev="scale" transition-next="scale" class="bg-white text-grey-9 text-left">
    
                            <q-tab-panel name="funcionario">
                                <div class="text-h6 text-weight-regular" style="margin:20px">Dados funcionario</div>
                                <q-card-section>
                                    <input type="hidden" v-model="funcionario.id" />
                                    <div class="q-gutter-md">
                                        <q-select dense outlined emit-value map-options v-model="funcionario.cargo_id" :options="cargos" label="Cargos" />
                                        <q-input dense outlined v-model="funcionario.nome" label="Nome" />
                                        <q-input dense outlined v-model="funcionario.cpf"  v-mask="['###.###.###-##']" label="Cpf" />
                                        <q-input dense outlined v-model="funcionario.telefone" label="Telefone" />
                                        <q-input dense outlined v-model="funcionario.email" label="Email" />
                                    </div>
                                </q-card-section>
                            </q-tab-panel>
                            
                            <q-tab-panel name="endereco">
                                <div class="text-h6 text-weight-regular" style="margin:20px">Endereço</div>
                                <q-card-section>
                                    <div class="q-gutter-md">
                                            <q-input dense outlined v-model="funcionario.endereco" label="Endereco" />
                                     </div>
                                </q-card-section>
                            </q-tab-panel>

                            <q-tab-panel name="detalhes">
                                <div class="text-h6 text-weight-regular" style="margin:20px">Detalhes</div>
                                <q-card-section>
                                    <div class="q-gutter-md">
                                        <q-input dense outlined type="textarea" v-model="funcionario.observacao" label="Observação" />
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
import CargoService from '../../service/Cargo/CargoService';
import ModalTitleComponent from '../../components/modal/ModalTitleComponent';

export default {
    name: 'ModalCadastroFuncionario',
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
            funcionario: {},
            cargos: [],
            tab: 'funcionario',
            CargoService: new CargoService(),
        };
    },
    methods: {
        salvar() {
            this.$emit('salvar', this.funcionario);
        },
        fechar() {
            this.$emit('fechar');
        },
        async loadCargos() {
            const data = await this.CargoService.list();
            this.cargos = data.map(item => ({ label: item.cargo, value: item.id }));
        },
    },
    mounted() {
        this.loadCargos();
    },
    watch: {
        edit(newEdit) {
            this.funcionario = { ...newEdit };
        },
    },
};
</script>
