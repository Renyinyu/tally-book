<script lang="ts" setup>
import { showToast } from "vant"
import { useRouter } from "vue-router"

import { TOKEN_KEY } from "@/utils/constants"
import { login } from "@/apis/common"

const router = useRouter()

const username = ref("")
const password = ref("")

interface ILoginDTO {
  username: string
  password: string
}

const handleSubmit = async (values: ILoginDTO) => {
  try {
    const res = await login({ ...values })
    console.log("res,", res)
    localStorage.setItem(TOKEN_KEY, res.data.token)
    router.replace("/tab/bill")
  } catch (error) {
    showToast(error.message)
  }
}
</script>

<template>
  <div class="login">
    <div class="head"></div>
    <van-form @submit="handleSubmit">
      <van-cell-group inset>
        <van-field
          v-model="username"
          name="username"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]" />
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]" />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<style scoped lang="scss">
.login {
  min-height: 100vh;
  background-image: linear-gradient(
    217deg,
    #6fb9f8,
    #3daaf85e,
    #49d3fc1a,
    #3fd3ff00
  );

  .head {
    height: 200px;
    background: url("//s.yezgea02.com/1616032174786/cryptocurrency.png")
      no-repeat center;
    background-size: 120%;
    margin-bottom: 24px;
  }
}
</style>
