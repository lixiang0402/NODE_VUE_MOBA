<template>
  <div class="el-container">
    <el-card header="请先登录" class="el-card">
      <el-form :model="model" ref="refForm" label-width="60px" @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>
        <el-button style="margin:0 auto;" type='primary' native-type="submit">登录</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {
        username: '',
        password: ''
      }
    }
  },
  created: function () { },
  methods: {
    async login() {
      const { data: res } = await this.$http.post('/login', this.model)
      this.$message.success("登陆成功")
      localStorage.token = res
      this.$router.push('/')
    }
  },
}
</script>

<style scoped>
body {
  background-color: red;
}
.el-card {
  width: 25rem;
  margin: 10rem auto;
}
.el-form {
  display: flex;
  flex-direction: column;
}
</style>
