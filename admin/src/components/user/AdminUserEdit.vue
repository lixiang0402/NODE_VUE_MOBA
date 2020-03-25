<template>
  <div>
    <h1>{{id?"编辑":"新建"}}物品</h1>
    <el-form :model="model" label-width="100px" @submit.native.prevent="save" ref="formRef">
      <el-form-item label="用户名" prop='username'>
        <el-input v-model.trim="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop='password'>
        <el-input v-model.trim="model.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type='primary' native-type='submit'>保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {

    return {
      model: {
        username: '',
        password: ''
      },

    }
  },
  created: async function () {
    this.id && this.fetch()
  },
  methods: {
    save: async function () {
      if (this.model.username == "" || this.model.username == undefined) return this.$message.error("用户名不可以为空")
      let res
      if (this.id) {
        res = await this.$http.put(`/rest/admin_users/${this.id}`, this.model)
      }
      else {
        res = await this.$http.post('/rest/admin_users', this.model)
      }
      if (res.status !== 200) return this.$message.error("保存失败")
      this.id ? this.$message.success("修改成功") : this.$message.success("保存成功")
      this.$router.push('/admin_users/list')
    },
    async fetch() {
      const res = await this.$http.get(`/rest/admin_users/${this.id}`)
      this.model = res.data
    },
  },
  // 检测路由变化
  watch: {
    '$route.path': function (newVal, oldVal) {
      this.$refs.formRef.resetFields();
      console.log(newVal, oldVal, "/admin_users/edit/")
    }
  }

}
</script>
