<script lang="ts" setup>
// import NavBar from '@/components/NavBar/index.vue'
</script>

<template>
  <section class="nav-layout">
    <main class="nav-layout-main">
      <router-view></router-view>
    </main>
    <NavBar />
  </section>
</template>

<style scoped lang="scss">
.nav-layout {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100vh;

  &-main {
    box-sizing: border-box;
    flex: 1;
    overflow: auto;
  }
}
</style>
