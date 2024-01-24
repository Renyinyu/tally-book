<script lang="ts" setup>
import { ref } from "vue"

const active = ref("bill")
const tabbarList = ref([
  { name: "bill", icon: "balance-list-o", title: "账单", to: "/tab/bill" },
  {
    name: "statistics",
    icon: "bar-chart-o",
    title: "统计",
    to: "/tab/statistics"
  },
  { name: "mine", icon: "user-o", title: "我的", to: "/tab/mine" }
])
</script>

<template>
  <van-tabbar v-model="active" :fixed="false">
    <van-tabbar-item
      v-for="tab in tabbarList"
      :key="tab.name"
      :name="tab.name"
      :icon="tab.icon"
      :to="tab.to"
      replace
      >{{ tab.title }}</van-tabbar-item
    >
  </van-tabbar>
</template>

<style scoped lang="scss"></style>
