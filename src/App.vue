<template>
    <div id="q-app" class="fundo">
        <router-view />
    </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    if (this.$store.getters['auth/isAuthenticated']) {
      this.$store.dispatch('user/USER_REQUEST');
    }
  },
};
</script>


<style>
.fundo {
    background-color: #282a2f
}
</style>

