<template>
  <q-page style="padding: 40px">
    <div class="row">
      <div class="col-xs-12 col-sm-6 col-md-4">
        col
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4">
        col
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4">
        col
      </div>
    </div>
    <q-card>
      <q-card-section>
        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
        >
          <div class="col-12 col-md-12">

            <q-input
              outlined
              v-model="cliente.nome"
              label="Digite o nome"
            />
          </div>

          <q-input
            filled
            type="number"
            v-model="cliente.cpfcnpj"
            label="Your age *"
          />
        </q-form>
      </q-card-section>
      <q-card-actions>
        <div>
          <q-btn
            label="Submit"
            @click.prevent="onSubmit"
            color="primary"
          />
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-card-actions>
    </q-card>

  </q-page>
</template>

<script>
import {
  QForm, QCard,
  QCardSection,
  QCardActions,
} from 'quasar';

import axios from 'axios';

export default {
  name: 'PageIndex',
  components: {
    QForm,
    QCard,
    QCardSection,
    QCardActions,
  },
  data() {
    return {
      cliente: {},
    };
  },
  methods: {
    onSubmit() {
      const url = 'http://192.168.1.224:8000/api/clientes';
      axios.post(url, this.cliente).then(() => {
      });
    },
    onReset() {

    },
  },
};
</script>
