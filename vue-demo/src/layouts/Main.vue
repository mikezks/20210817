<template>
  <img alt="Vue logo" src="../assets/logo.png">
  <ul>
    <li><v-link href="/">Home</v-link></li>
    <li><v-link href="/product">Product</v-link></li>
  </ul>

  <slot></slot>
</template>

<script>
import VLink from '../components/VLink.vue'

export default {
  components: {
    VLink
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

ul {
  padding-left: 0;
  list-style-position: inside;
  list-style-type: none;
}

img {
  width: 80px;
}
</style>
