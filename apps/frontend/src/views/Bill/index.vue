<script lang="ts" setup>
import TheHeader from './components/TheHeader.vue'
</script>

<template>
  <div class="bill">
    <TheHeader class="bill-header"></TheHeader>
    <main class="bill-main"></main>
  </div>
</template>

<style scoped lang="scss">
.bill {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;

  &-header {

  }

  &-main {
    flex: 1;
  }
}
</style>
