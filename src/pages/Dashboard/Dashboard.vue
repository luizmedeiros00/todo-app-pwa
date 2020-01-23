<template>
  <q-page padding>

    <q-card class="my-card">
      <q-card-section class="bg-grey-8 text-white">
        <div class="text-h6">Atividades</div>
        <div class="text-subtitle1">Acompanhamento das atividades</div>
      </q-card-section>

    </q-card>
    <br>
    <div class="row q-col-gutter-md">
      <div class="col-6">
        <q-card class="my-card">
          <q-card-section class="bg-primary text-white">
            <div class="text-h4 text-center">{{totalAtividades.totalIniciado}}</div>
            <div class="text-subtitle1 text-center">Iniciadas</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-6">
        <q-card class="my-card">
          <q-card-section class="bg-red-9 text-white">
            <div class="text-h4 text-center">{{totalAtividades.totalNaoIniciado}}</div>
            <div class="text-subtitle1 text-center">Não Iniciadas</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-6">
        <q-card class="my-card">
          <q-card-section class="bg-amber text-white">
            <div class="text-h4 text-center">{{totalAtividades.totalEmAndamento}}</div>
            <div class="text-subtitle1 text-center">Em andamento</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-6">
        <q-card class="my-card">
          <q-card-section class="bg-green text-white">
            <div class="text-h4 text-center">{{totalAtividades.totalConcluido}}</div>
            <div class="text-subtitle1 text-center">Concluidas</div>
          </q-card-section>
        </q-card>
      </div>
    </div>

  </q-page>
</template>

<script>
import { QPage } from 'quasar';
import AtividadeService from '../../service/Atividade/AtividadeService';

export default {
  components: { QPage },
  data() {
    return {
      AtividadeService: new AtividadeService(),
      totalAtividades: [],
    };
  },
  methods: {
    async loadAtividades() {
      const data = await this.AtividadeService.totalAtividades();
      this.totalAtividades = data;
    },

    atualiza() {
      setInterval(() => {
        this.loadAtividades();
      }, 5000);
    },

  },
  created() {
    this.atualiza();
    this.loadAtividades();
  },


};
</script>
