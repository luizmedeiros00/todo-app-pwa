<template>
  <div class="lista-atividade">
    <q-page padding>
      <q-table
        title="Lista de Atividades"
        :data="atividades"
        :columns="columns"
        row-key="id"
      >
        <q-td
          slot="body-cell-cliente"
          slot-scope="item"
          :props="item"
        >
         {{item.row.cliente.nome}}
        </q-td>

        <q-td
          slot="body-cell-action"
          slot-scope="props"
          :props="props"
        >
          <q-btn
            @click="edit(props.row)"
            color="primary"
            flat
            icon="edit"
          />
          <q-btn
            color="red"
            flat
            icon="delete"
          />
        </q-td>
      </q-table>
       <q-page-sticky
        position="bottom-right"
        :offset="[18, 18]"
      >
        <q-btn
          @click="showModal = true"
          fab
          icon="add"
          color="accent"
        />
      </q-page-sticky>
    </q-page>
    <modal-cadastro
      :show="showModal"
      :cli="clientes"
      @fechar="fecharModal"
      @salvar="onSubmit($event)"
    />
  </div>
</template>
<script>
import { QPage, QTable, QPageSticky } from 'quasar';
import AtividadeService from '../../service/Atividade/AtividadeService';
import ClienteService from '../../service/Cliente/ClienteService';
import DataFilter from '../../filter/data';
import ModalCadastro from './ModalCadastro';

export default {
  name: 'ListaAtividade',
  components: {
    QPage, QTable, QPageSticky, ModalCadastro,
  },
  data() {
    return {
      AtividadeService: new AtividadeService(),
      ClienteService: new ClienteService(),
      showModal: false,
      atividade: {},
      atividades: [],
      clientes: [],
      columns: [
        {
          name: 'datacadastro', label: 'Data', field: 'datacadastro', align: 'left', format: val => DataFilter(val),
        },
        {
          name: 'descricao', label: 'Descrição', field: 'descricao', align: 'left',
        },
        {
          name: 'imposto', label: 'Imposto', field: 'imposto', align: 'left',
        },
        {
          name: 'saving', label: 'Saving', field: 'saving', align: 'left',
        },
        {
          name: 'honorario', label: 'Honorario', field: 'honorario', align: 'left',
        },
        {
          name: 'cliente', label: 'Cliente', field: 'cliente', align: 'left',
        },
        {
          name: 'faturado', label: 'Faturado', field: 'faturado', align: 'left',
        },
        {
          name: 'status', label: 'Status', field: 'status', align: 'left',
        },

        {
          name: 'action', label: 'Ação', field: 'action', align: 'left',
        },
      ],
    };
  },
  methods: {
    edit(item) {
      this.atividade = { ...item };
    },
    async onSubmit() {
      await this.AtividadeService.createOrUpdate(this.atividade);
      this.load();
      this.onReset();
      this.fecharModal();
    },
    async load() {
      const data = await this.AtividadeService.list();
      this.atividades = data;
    },
    async loadClientes() {
      const data = await this.ClienteService.list();
      this.clientes = data.map(item => {
            console.log(item.nome)
            return { label: item.nome, value: item.id };
          });
    },
    onReset() {
      this.atividade = {};
    },
    fecharModal() {
      this.showModal = false;
    },
  },
  mounted() {
    this.load();
    this.loadClientes();
  },
};
</script>
