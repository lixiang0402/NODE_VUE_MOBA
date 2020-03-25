<template>
  <div>
    <h1>{{id?"编辑":"新建"}}分类</h1>
    <el-form :model="model" label-width="100px" @submit.native.prevent="save" ref="formRef">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model.trim="model.name"></el-input>
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
        name: '',
        parent: ''
      },
      parents: [],
    }
  },
  created: async function () {
    this.fetchParents()
    this.id && this.fetch()
  },
  methods: {
    save: async function () {
      if (this.model.name == "") return this.$message.error("分类名称不可以为空")
      let res
      if (this.id) {
        res = await this.$http.put(`/rest/categories/${this.id}`, this.model)
      }
      else {
        res = await this.$http.post('/rest/categories', this.model)
      }
      if (res.status !== 200) return this.$message.error("保存失败")
      this.id ? this.$message.success("修改成功") : this.$message.success("保存成功")
      this.$router.push('/categories/list')
    },
    async fetch() {
      const res = await this.$http.get(`/rest/categories/${this.id}`)
      this.model = res.data
    },
    async fetchParents() {
      const { data: res } = await this.$http.get(`/rest/categories`)
      console.log(res)
      this.parents = res
    }
  },
  // 检测路由变化
  watch: {
    '$route.path': function (newVal, oldVal) {
      this.$refs.formRef.resetFields();
      console.log(newVal, oldVal)
    }
  }

}
</script>

<style scoped lang="less">
</style>
