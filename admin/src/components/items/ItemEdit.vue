<template>
  <div>
    <h1>{{id?"编辑":"新建"}}物品</h1>
    <el-form :model="model" label-width="100px" @submit.native.prevent="save" ref="formRef">
      <el-form-item label="名称" prop='name'>
        <el-input v-model.trim="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标" prop='icon'>
        <el-upload class="avatar-uploader" :action="uploadUrl" :show-file-list="false" :on-success="afterUpload" :headers="getAuthHeaders()">
          <img v-if="model.icon" :src="model.icon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

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
        icon: ''
      },

    }
  },
  created: async function () {
    this.id && this.fetch()
  },
  methods: {
    save: async function () {
      if (this.model.name == "" || this.model.name == undefined) return this.$message.error("分类名称不可以为空")
      let res
      if (this.id) {
        res = await this.$http.put(`/rest/items/${this.id}`, this.model)
      }
      else {
        res = await this.$http.post('/rest/items', this.model)
      }
      if (res.status !== 200) return this.$message.error("保存失败")
      this.id ? this.$message.success("修改成功") : this.$message.success("保存成功")
      this.$router.push('/items/list')
    },
    async fetch() {
      const res = await this.$http.get(`/rest/items/${this.id}`)
      this.model = res.data
    },
    afterUpload(res) {
      console.log(res)
      this.$set(this.model, "icon", res.url)
      // this.model.icon = res.url
    }
  },
  // 检测路由变化
  watch: {
    '$route.path': function (newVal, oldVal) {
      this.$refs.formRef.resetFields();
      console.log(newVal, oldVal, "/items/edit/")
    }
  }

}
</script>
