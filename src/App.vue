<template>
  <Header />
  <RouterView />
</template>

<script>
import Header from './components/TheHeader.vue';

export default {
  components: { Header },
};
</script>

