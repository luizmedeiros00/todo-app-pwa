<template>
  <q-layout>
    <q-page-container>
      <q-page class="bg-light-green window-height window-width row justify-center items-center">
        <div class="column">
          <div class="row">
            <h5 class="text-h5 text-white q-my-md"></h5>
          </div>
          <div class="row">
            <q-card
              square
              bordered
              class="q-pa-lg shadow-1"
            >
              <q-card-section>
                <q-form class="q-gutter-md">
                  <q-input
                    square
                    filled
                    clearable
                    v-model="user.email"
                    type="email"
                    label="email"
                  />
                  <q-input
                    square
                    filled
                    clearable
                    v-model="user.password"
                    type="password"
                    label="password"
                  />
                </q-form>
              </q-card-section>
              <q-card-actions class="q-px-md">
                <q-btn
                  unelevated
                  color="light-green-7"
                  size="lg"
                  class="full-width"
                  label="Login"
                />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
import {
  QLayout,
  QPageContainer, QPage, QCard, QForm,
} from 'quasar';

export default {
  name: 'Login',
  components: {
    QLayout,
    QPageContainer,
    QPage,
    QCard,
    QForm,
  },
  data() {
    return {
      errorLogin: false,
      user: {},
    };
  },
  methods: {
    login() {
      this.$store.dispatch('auth', this.user).then(() => {
        this.$router.push({ path: '/' });
      });
    },
  },
};
</script>
<style>
.q-card {
  width: 360px;
}
</style>
