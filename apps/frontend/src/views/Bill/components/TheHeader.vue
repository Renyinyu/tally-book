<script lang="ts" setup>
import dayjs from "dayjs"

const columns = [
  { text: "杭州", value: "Hangzhou" },
  { text: "宁波", value: "Ningbo" },
  { text: "温州", value: "Wenzhou" },
  { text: "绍兴", value: "Shaoxing" },
  { text: "湖州", value: "Huzhou" }
]
const currentType = ref(['Ningbo'])

const showTypePopup = ref(false)

const typeText = computed(() => {
  const target = columns.find(col => currentType.value.includes(col.value))
  return target ? target.text : '全部类型'
})

const columnsType = ["year", "month"]
const minDate = new Date(2020, 0, 1)
const maxDate = new Date(2025, 5, 1)

const showDatePopup = ref(false)
const currentDate = ref([dayjs().year(), dayjs().month() + 1])

const currentDateTxt = computed(() => {
  const [year, month] = currentDate.value
  return dayjs(new Date(year, month - 1)).format("YYYY-MM")
})

const handleDateConfirm = ({ selectedValues }) => {
  currentDate.value = selectedValues
  showDatePopup.value = false
}

const handleTypeConfirm = ({selectedValues}) => {
  currentType.value = selectedValues
  showTypePopup.value = false
}
</script>

<template>
  <div v-bind="$attrs" class="bill-heder border-box f-d-v f-h-c">
    <div class="data-row f-v-c">
      <p>总支出：<i class="d-din-font">¥534</i></p>
      <p>总收入：<i class="d-din-font">¥534</i></p>
    </div>
    <div class="filter-row f-e">
      <div class="filter-type" @click="showTypePopup = true">{{ typeText }}<van-icon name="arrow-down" /></div>
      <div class="filter-date" @click="showDatePopup = true">
        {{ currentDateTxt }} <van-icon name="arrow-down" />
      </div>
    </div>
  </div>

  <van-popup v-model:show="showDatePopup" position="bottom">
    <van-date-picker
      :model-value="currentDate"
      title="日期"
      :columns-type="columnsType"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="handleDateConfirm"
      @cancel="showDatePopup = false" />
  </van-popup>

  <van-popup v-model:show="showTypePopup" position="bottom">
    <van-picker
      title="类型"
      :model-value="currentType"
      :columns="columns"
      @confirm="handleTypeConfirm"
      @cancel="showTypePopup = false"/>
  </van-popup>
</template>

<style scoped lang="scss">
.bill-header {
  background: $primary-color;
  height: 120px;
  color: $white;
  padding: $padding-m;

  .data-row {
    gap: $margin-l;
    font-size: $font-size-l;
    margin-bottom: $margin-l;

    i {
      font-size: 28px;
    }
  }

  .filter-row {
    gap: $margin-m;
    font-size: $font-size-l;
  }
}
</style>
