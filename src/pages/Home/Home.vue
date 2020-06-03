<template>
  <q-page padding>
    <title-component
      title="Reuniões"
      subtitle="Acompanhamento das reuniões"
    />

    <div class="q-gutter-sm">
      <card-component
        title="Reuniões Agendadas"
         color="bg-blue"
        :information="totalAgenda.totalagenda"
      />

      <card-component
        title="Reuniões Confirmadas"
       
           color="bg-green"
        :information="totalAgenda.totalconfirmado"
      />

      <card-component
        title="Reuniões Não Confirmadas"
      
         color="bg-red-9"
        :information="totalAgenda.totalnaoconfirmado"
      />

      <!-- <card-component
        title="Concluídas"
        color="bg-green"
        :information="totalAgenda.totalConcluido"
      /> -->

    </div>
  </q-page>
</template>

<script>
import { QPage } from 'quasar';
import AgendaService from '../../service/Agenda/AgendaService';
import TitleComponent from '../../components/Title/TitleComponent';
import CardComponent from './CardComponent';

export default {
  components: { QPage, TitleComponent, CardComponent },
  data() {
    return {
      AgendaService: new AgendaService(),
      totalAgenda: [],
    };
  },
  methods: {
    async loadAgenda() {
      const data = await this.AgendaService.totalAgenda();

      console.log(data)
      this.totalAgenda = data;
    },

    atualiza() {
      setInterval(() => {
        this.loadAgenda();
      }, 3000);
    },

  },
  created() {
   // this.atualiza();
  },

};
</script>
