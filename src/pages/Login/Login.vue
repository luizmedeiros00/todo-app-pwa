<template>
  <q-layout>
    <q-page-container>
      <q-page class="bg-white  row justify-center items-center">
        <div class="q-pa-md row items-start q-gutter-md">
          <a href="http://ramaral.com">
            <img
              src="http://ramaral.com/wp-content/themes/ramaral/framework/images/logo.png"
              width="300px"
            >
          </a>
        </div>
        <div class="row">
          <q-card>
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
                @click.prevent="login()"
                unelevated
                color="primary"
                size="lg"
                class="full-width"
                label="Login"
              />
            </q-card-actions>
          </q-card>
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
      this.$store.dispatch('auth/AUTH_REQUEST', this.user).then(() => {
        this.$router.push({ path: '/' });
      })
        .catch(() => {
          this.$q.notify({
            message: 'Usuário ou senha inválida',
            color: 'red',
          });
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
