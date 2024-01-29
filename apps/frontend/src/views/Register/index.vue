<script lang="ts" setup>
import VueClientRecaptcha from 'vue-client-recaptcha'
import { showToast } from 'vant'
import { useRouter } from 'vue-router'

import { register } from '@/apis/common'

const router = useRouter()

const username = ref('')
const password = ref('')
const code = ref('')
const targetCode = ref('')
const isCodeValid = ref(false)

interface IRegisterDTO {
  username: string;
  password: string;
  code: string;
}

const handleSubmit = async (values: IRegisterDTO) => {
  try {
    await register({ username: values.username, password: values.password})
    router.replace('/login')
  } catch (error: any) {
    console.log(error)
    showToast(error.message)
  }

}

const getCaptchaCode = (value: string) => {
  targetCode.value = value
  code.value = value
}

const checkValidCaptcha = (value: boolean) => {
  isCodeValid.value = value
}

const codeValidator = (val: string) => {
  return val === targetCode.value
}

</script>

<template>
  <div class="register">
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
        <van-field
          v-model="code"
          name="code"
          label="验证码"
          placeholder="请填写验证码"
          :rules="[
            { required: true, message: '请填写验证码' },
            { validator: codeValidator, message: '验证码不正确' }
          ]" >
          <template #extra>
            <VueClientRecaptcha
              :value="code"
              :count="4"
              canvasClass="captcha-canvas"
              @getCode="getCaptchaCode"
              @isValid="checkValidCaptcha"
              />
          </template>
        </van-field>
       
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          注册
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<style scoped lang="scss">
@import url("/node_modules/vue-client-recaptcha/dist/style.css");
.register {
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

:deep(.captcha-canvas) {
  width: 100%;
  height: 30px;
}
</style>
